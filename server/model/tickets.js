const db = require('../config');
const { parseJson, parseRowsJson } = require('../middlewares/database');

class Tickets {

    // https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format
    // https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_curdate
    // https://www.mysqltutorial.org/mysql-variables/
    // https://mysqlcode.com/mysql-format/
    // https://www.tutorialspoint.com/storing-value-from-a-mysql-select-statement-to-a-variable

    async GestionStatics(request, response) {
        await db.query(`
        CALL sp_GetManageStaticsV2();
        `, (error, result, columns) => {
            if (error) {
                console.log(error);
                return response.status(200).json({
                    status: 400,
                    error
                });
            }

            const statics = parseJson(result[0][0]['result'], true);

            return response.status(200).json({
                status: 200,
                statics
            });
        });

    }

    async repairStatus(request, response) {
        await db.query(
            `CALL sp_GetRepairStatus();`,
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.status(200).json({
                        status: 400,
                        error
                    });
                }

                return response.status(200).json({
                    status: 200,
                    repairStatus: result[0]
                });
            }
        )
    }

    async payMethods(request, response) {
        await db.query(
            `CALL sp_GetPayMethods();`,
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.status(200).json({
                        status: 400,
                        error
                    });
                }

                return response.status(200).json({
                    status: 200,
                    payMethods: result[0]
                });
            }
        )
    }

    async create(request, response, next) {
        const {
            customerFullName,
            customerPhone,
            deliverDay,
            deliverMonth,
            deliverYear,
            fabricant,
            idUser,
            model,
            observations,
            payMethods,
            quotation,
            receivedDay,
            receivedMonth,
            receivedYear,
            repairStatus,
            service,
            total
        } = request.body;

        await db.query('CALL sp_CreateTicket(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
            receivedDay, receivedMonth, receivedYear, deliverDay,
            deliverMonth, deliverYear, model, fabricant, observations,
            service, quotation, payMethods, total,
            idUser, repairStatus, customerFullName, customerPhone
        ],
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.status(400).json({
                        status: 500,
                        error
                    });
                }

                return response.status(200).json({
                    status: 200,
                    message: 'Ticket agregado'
                });
            });
    }

    async add(request, response, next) {
        console.log(`■ Trying to save ticket...`);

        const { firstName, ticketMiddlename, ticketLastname1,
            ticketLastname2, ticketPhone, payMethod, service,
            model, description, fabricant, price, total, repairState,
            recolectionDay, recolectionMonth, recolectionYear,
            deliveryDay, deliveryMonth, deliveryYear, idClientSelected } = request.body;

        await db.query(`INSERT INTO ticket values 
        (
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?
        )`,
            [
                null, recolectionDay, recolectionMonth, recolectionYear,
                deliveryDay, deliveryMonth, deliveryYear, model, fabricant,
                description, service, price, 1,
                payMethod, total, idClientSelected, repairState,
                1, `${firstName} ${ticketMiddlename} ${ticketLastname1} ${ticketLastname2}`, ticketPhone
            ], (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error
                    });
                }
                request.body.ticketId = result.insertId;
                console.log(`Ticket saved!`);
                next();
            });

    }

    async get(request, response, next) {

        console.log(`■ Fetching tickets...`);

        await db.query(`SELECT * FROM ticket 
        INNER JOIN servicios ON
        ticket.servicio = servicios.idServicio
        `, (error, result, columns) => {
            if (error) {
                console.log(error);
                return response.json({
                    status: 500,
                    error
                });
            }

            console.log(result);

            console.log(`■ Tickets fetched!`);
            request.body.tickets = result;
            next();
        })
    }

    async delete(request, response, next) {
        console.log(`Deleting ticket...`);

        const { idTicket } = request.body;
        ;
        await db.query(`DELETE FROM ticket WHERE idTicket = ?`, idTicket, (error, result, column) => {
            if (error) {
                return response.json({
                    status: 500,
                    error
                });
            }

            console.log(`Ticket deleted!`);

            return response.json({
                status: 200,
                message: `Ticket eliminado`
            });
        });
    }

    async saveStatesTicket(request, response, next) {

        const { equipmentState, ticketId } = request.body;

        await request.body.equipmentState.map(async (status) => {
            await db.query(`INSERT INTO ticketestados values
            (?,?,?,?)
            `, [null, status.idEstadoTicketNombre, ticketId, status.estado],
                (error, result, columns) => {
                    if (error) {
                        return response.json({
                            status: 500,
                            error
                        });
                    }
                })
        });

        return response.json({
            status: 200,
            message: `Ticket creado`
        });

    }

    async find(request, response, next) {

        console.log(`■ Looking for the ticket...`);

        await db.query(`SELECT * FROM ticket 
        WHERE idTicket = ?`,
            request.params.idTicket,
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error
                    });
                }

                if (result.length === 0) {
                    return response.json({
                        status: 404,
                        message: `No se encontro el ticket`
                    });
                }

                console.log(`Ticket Founded!`);

                request.body.infoTicket = result;
                next();
            })
    }

    async findState(request, response, next) {
        await db.query(`SELECT * FROM ticketestados WHERE
        ticketCorresponde = ?`, request.params.idTicket, (error, result, columns) => {
            if (error) {
                return response.json({
                    status: 500,
                    error
                });
            }

            return response.json({
                status: 200,
                ticketInfo: request.body.infoTicket,
                estatusEquipment: result
            });
        })
    }

    async GetNoTickets(request, response, next) {

        await db.query(
            `CALL sp_GetNoTickets(?)`,
            request.query.idTecnico,
            (error, result, columns) => {
                if (error) {
                    return response.status(200).json({
                        status: 400,
                        error
                    });
                }

                request.params.pages = result[0][0]['noTickets'];
                next();
            }
        )
    }

    async UpdateTicket(request, response, next) {

        const { repairStatus, idTicket } = request.body;

        // const successQuery = response.status(200).json({
        //     status: 200,
        //     message: 'Ticket actualizado'
        // });

        // const errorQuery = response.status(200).json({
        //     status: 200,
        //     error: 'Error al actualizar ticket'
        // });

        await db.query(`
        
        UPDATE ticket SET estadoReparacion = ? WHERE idTicket = ?
        
        `,
            [repairStatus, idTicket],
            async(error, results, columns) => {

                

                if (error){
                    return response.status(200).json({
                        status: 200,
                        error: 'Error al actualizar ticket'
                    });
                }

                if (repairStatus === 2) {

                    await db.query(`
                        CALL sp_AddTicketMove(?)
                    `, idTicket,
                        (error, result, fields) => {
                            if (error) return errorQuery;

                            return response.status(200).json({
                                status: 200,
                                message: 'Ticket actualizado'
                            });
                        });

                } else {
                    return response.status(200).json({
                        status: 200,
                        message: 'Ticket actualizado'
                    });
                }
            }
        )
    }

    async GetTicket(request, response, next) {
        await db.query(
            'CALL sp_GetTicket(?)',
            request.params.idTicket,
            (error, results, columns) => {
                if (error) {
                    return response.status(200).json({
                        status: 400,
                        error
                    });
                }

                const ticket = results[0][0];

                return response.status(200).json({
                    status: 200,
                    ticket: {
                        ...ticket,
                        customer: JSON.parse(ticket.customer)
                    }
                });
            }
        )
    }

    async GetTickets(request, response, next) {

        await db.query(
            `CALL sp_GetTickets(?,?,?)`,
            [
                request.query.idTecnico,
                request.params.rangeBegin,
                request.params.noRegisters
            ],
            (error, result, columns) => {
                if (error) {

                    console.log(error);

                    return response.status(200).json({
                        status: 400,
                        error
                    });
                }

                return response.json({
                    status: 200,
                    data: {
                        pages: +(request.params.pages),
                        actualPage: +(request.query.pagina),
                        tickets: parseRowsJson(result[0], 'ticket')
                    }
                });
            }
        )
    }

    async update(request, response, next) {
        console.log(`■ Updating ticket of client...`);

        console.log(request.body);

        await db.query(`UPDATE ticket SET
            diaRecoleccion = ?,
            mesRecoleccion = ?,
            recolectionYear = ?,
            diaEntrega = ?,
            mesEntrega = ?,
            entregaYear = ?,
            modelo = ?,
            marca = ?,
            descripcion = ?,
            servicio = ?,
            cotizacion = ?,
            medioPagoId = ?,
            totalPago = ?,
            estadoReparacion = ? WHERE idTicket = ?
        `, [
            request.body.recolectionDay,
            request.body.recolectionMonth,
            request.body.recolectionYear,
            request.body.deliveryDay,
            request.body.deliveryMonth,
            request.body.deliveryYear,
            request.body.model,
            request.body.fabricant,
            request.body.description,
            request.body.service,
            request.body.price,
            request.body.payMethod,
            request.body.total,
            request.body.repairState,
            request.body.ticketId
        ], (error, result, columns) => {
            if (error) {
                return response.json({
                    status: 500,
                    error
                });
            }

            console.log(`■ Updated correctly`);
            return response.json({
                status: 200,
                message: `Ticket actualizado`
            });
        })
        return;
    }
}

const ModelTickets = new Tickets();
module.exports = ModelTickets;