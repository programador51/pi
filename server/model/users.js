//@ts-check

const db = require('../config');
/*
rol
    1 - PC
    2 - Movil
    3 - SuperAdmin

sucursal
    1 - San Nicolas
    2 - Monterrey
    3 - Guadalupe
    4 - Apodaca    
*/

class User{
    async signUp(request,response,next){
        await db.query(`INSERT INTO usuario values (?,?,?,?,?,?,?,?,?)`,
        [
            null,
            request.body.userName,
            request.body.hashPass,
            request.body.rol,
            request.body.sucursal,
            request.body.nombre,
            request.body.nombre2,
            request.body.paterno,
            request.body.materno
        ],
        (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(result);
            return response.json({
                status:200,
                message:`Usuario registrado correctamente`
            });
        }
        )
    }

    async listUsers(request,response,next){
        await db.query(`CALL sp_GetUsers();
        `,(error,results,columns)=>{

            if(error){
                return response.status(400).json({
                    status:500,
                    error
                });
            }

            const users = results[0].map(user=>{
                return{
                    ...user,
                    rol:JSON.parse(user.rol),
                    name:JSON.parse(user.name)
                }
            });

            return response.status(200).json({
                status:200,
                users
            });
        });
    }

    async userCredentials(request,response,next){
        await db.query(`SELECT * FROM usuario WHERE username = ?`,
        request.body.userName,
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            if(result.length===0){
                return response.json({
                    status:404,
                    message:`Usuario o contraseña incorrectos`
                });
            }

            request.body.userInfo = result;
            next();
        })
    }
}

const UserModel = new User();
module.exports = UserModel;