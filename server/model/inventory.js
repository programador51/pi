const db = require('../config');

class Inventory {

    async GetPdfReport(request, response) {
        const { typeReport } = request.params;

        if (`${typeReport}` === 'diario') {
            db.query(`CALL sp_GetDailyReportPdf()`, (e, res, cols) => {

                if (e) {
                    console.log(e);

                    return response.status(200).json({
                        status: 500,
                        res: null
                    });
                }

                console.log(res);

                return response.status(200).json({
                    total: res[0][0],
                    incomings: res[1],
                    expenses: res[2],
                    tickets: res[3]
                });
            })
        } else {
            db.query(`CALL sp_GetMontlyReportPdf();`, (e, res, cols) => {
                if (e) {
                    console.log(e);

                    return response.status(200).json({
                        status: 500
                    });
                }

                console.log(res);

                return response.status(200).json({
                    total: res[0][0],
                    incomings: res[1],
                    expenses: res[2],
                    tickets: res[3]
                });
            });
        }
    }

    async GetNoLogCommodity(request, response, next) {
        db.query(`SELECT COUNT(*) AS noLogs FROM loginventory`, (e, res, fields) => {
            if (e) {
                return response.status(200).json({
                    status: 500,
                    e
                });
            } else {
                console.log(res[0]['noLogs']);

                request.params.pages = res[0]['noLogs'];
                next();
            }
        })
    }

    async GetLogs(request, response) {
        db.query(`CALL sp_GetLogManage(?,?)`, [request.params.rangeBegin,
        request.params.noRegisters], (e, res, fields) => {
            if (e) {
                return response.status(200).json({
                    status: 500,
                    e
                });
            } else {

                console.log(res)

                return response.json({
                    status: 200,
                    data: {
                        pages: +(request.params.pages),
                        actualPage: +(request.query.pagina),
                        commodity: res[0]
                    }
                });
            }
        });
    }

    async RequestInventory(request, response) {
        console.log(request.body);

        db.query(`
        
         CALL sp_AddRequestMovement(?,?,?,?,?,?);

        `, [
            request.body.idTechnician,
            request.body.quantity,
            request.body.price,
            request.body.total,
            request.body.idItem,
            request.body.fullName
        ],
            (error, result, columns) => {

                console.log(error);

                if (error) {
                    return response.status(200).json({
                        status: 500,
                        message: 'Intenta solicitar la mercancia nuevamente',
                        error
                    });
                }

                return response.status(200).json({
                    status: 200,
                    message: 'Mercancia solicitada'
                });
            })
            ;
    }

    async AvailableInventory(request, response) {
        db.query(
            'CALL sp_GetInventoryAvailable();',
            (error, result, columns) => {
                if (error) {
                    return response.status(200).json({
                        status: 500,
                        inventory: []
                    });
                }

                return response.status(200).json({
                    status: 200,
                    inventory: result[0]
                });
            })
    }

    async addCategory(request, response, next) {
        const { category } = request.body;

        console.log(`■ Adding ${category}...`);

        db.query(`INSERT INTO categoria values (?,?)`,
            [null, category],
            (error, result, columns) => {
                if (error) {
                    return response.json({
                        status: 500,
                        message: error
                    });
                }

                return response.json({
                    status: 200,
                    message: `${category} agregado correctamente.`
                });
            })
    }

    async getInventory(request, response, next) {

        console.log(`■ Requesting inventory...`)

        db.query(`SELECT * FROM inventario 
        INNER JOIN categoria ON 
        inventario.categoria = categoria.idCategoria
        ORDER BY codigo DESC`,
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        message: `Intente mas tarde...`
                    });
                }
                console.log(result);
                return response.json({
                    status: 200,
                    inventory: result
                });
            });
    }

    async getCategorys(request, response, next) {
        db.query(`SELECT * FROM categoria`, (error, result, columns) => {
            if (error) {
                console.log(error);
                return response.json({
                    status: 500,
                    message: error
                });
            }
            return response.json({
                status: 200,
                categorys: result
            });
        })
    }

    async addProduct(request, response, next) {

        console.log(`■ Adding product to inventory...`);
        const { description, category, stock, price, sell } = request.body;

        db.query(`INSERT INTO inventario values (?,?,?,?,?,?,?)`,
            [null, '', description, stock, category, price, sell],
            (error, result, columns) => {
                if (error) {
                    console.log(`■ Error: ${error}`);
                    return response.json({
                        status: 500,
                        message: error
                    })
                }
                return response.json({
                    status: 200,
                    message: `Producto agregado.`
                });
            })
    }

    async deleteProduct(request, response, next) {
        const { idProduct } = request.body;
        console.log(`■ Deleting product ${idProduct}...`);

        db.query(`DELETE FROM inventario WHERE codigo = ?`,
            idProduct,
            (error, result, columns) => {
                if (error) {
                    return response.json({
                        status: 500,
                        message: error
                    })
                }
                return response.json({
                    status: 200,
                    message: `Producto eliminado`
                });
            })
    }

    async editProduct(request, response, next) {
        const { description, category, stock, price, sell, idProduct } = request.body;

        console.log(`■ Updating ${idProduct}...`)

        db.query(`UPDATE inventario SET descripcion = ?,
        stock = ?,
        categoria = ?,
        precioCompra = ?,
        precioVenta = ? 
        WHERE codigo = ?
        `, [description, stock, category, price, sell, idProduct], (error, result, columns) => {
            if (error) {
                console.log(error);
                return response.json({
                    status: 500,
                    error
                });
            }
            return response.json({
                status: 200,
                message: `Producto actualizado`
            });
        })
    }
}

const ModelInvetory = new Inventory();

module.exports = ModelInvetory;