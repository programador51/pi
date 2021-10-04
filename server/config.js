const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'jl1731168',
//     database:'pi_ste'
// });

// const connection = mysql.createConnection('mysql://u9eozuq0padsf9m9:LpICjrPxJmxSO5DvKh8m@bu18dkxus5zr3k8itrwj-mysql.services.clever-cloud.com:3306/bu18dkxus5zr3k8itrwj');
const connection = mysql.createPool({
    connectionLimit:100,
    host:'bu18dkxus5zr3k8itrwj-mysql.services.clever-cloud.com',
    user:'u9eozuq0padsf9m9',
    password:'LpICjrPxJmxSO5DvKh8m',
    database:'bu18dkxus5zr3k8itrwj'
})

connection.connect(e=>{
    if(e){
        console.log(`■ There was an error connecting to DB ${e}`);
        return
    }
    console.log(`■ Connected to db success`);
});

function reconnect(){
    connection.connect(e=>{
        console.log('Reconnecting...');
        if(e){
            console.log(e);
            return;
        }
    })
}

connection.on('error',error=>{
    console.log('Database error',error);
    if(error.code==='PROTOCOL_CONNECTION_LOST'){
        reconnect();
    }else{
        throw error;
    }
});

module.exports = connection;