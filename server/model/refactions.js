const db = require('../config');

class Refaction {
    async add(request, response, next) {

        console.log(`■ Adding refaction`);

        const { quantity, refaction, fabricant,
            model, day, month, year, rol, sucursal } = request.body;

        await db.query(`INSERT INTO pedidos values 
        (
            ?,?,?,?,?,?,
            ?,?,?,?,?,?
        )`,
            [null, quantity, refaction, fabricant, model, 0, null, day, month, year, 0, sucursal], (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error
                    });                   
                }

                console.log(`■ Refaction added`);

                return response.json({
                    status: 200,
                    message: `Refaccion agregada`
                });
            })
    }

    async refactionsOffice(request,response,next){
        console.log(`■ Looking for the refactions of the day`);

        await db.query(`SELECT * FROM pedidos WHERE 
        dia = ? AND
        mes = ? AND
        yearTime = ? AND
        sucursal = ?`,
        [
            request.params.day,
            request.params.month,
            request.params.year,
            request.params.office
        ],(error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }
            console.log(`■ Refactions finded`);
            return response.json({
                status:200,
                refactions:result
            });
        })
    }

    async delete(request,response,next){

        console.log(`■ Trying to delete refaction...`);

        await db.query(`DELETE FROM pedidos WHERE pedido = ?`,
        request.body.id,
        (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`■ Refaction eliminated`)

            return response.json({
                status:200,
                message:`Refaccion eliminada`
            });
        })
    }

    async update(request,response,next){

        console.log(`■ Updating refaction...`);

        await db.query(`UPDATE pedidos SET 
        cantidad = ?,
        refaccion = ?,
        marca = ?,
        modelo = ?
        WHERE pedido = ?`,
        [
            request.body.quantity,
            request.body.refaction,
            request.body.fabricant,
            request.body.model,
            request.body.id
        ],
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`--- Refaction updated!!! ---`);
            return response.json({
                status:200,
                message:`Refaccion actualizada`
            });
        }
        )
    }
}

const ModelRefaction = new Refaction();

module.exports = ModelRefaction;