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
        await db.query(`INSERT INTO usuario values (?,?,?,?,?)`,
        [
            null,
            request.body.userName,
            request.body.hashPass,
            request.body.rol,
            request.body.sucursal
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

    async userCredentials(request,response,next){

        console.log(`■ Finding user on db... ${request.body.userName}`)

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

            console.log(`■ User founded`);
            next();
        })
    }
}

const UserModel = new User();
module.exports = UserModel;