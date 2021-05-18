const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pi_ste'
});

/* const connection = mysql.createConnection({
    connectionLimit:10,
    host:'bu18dkxus5zr3k8itrwj-mysql.services.clever-cloud.com',
    user:'u9eozuq0padsf9m9',
    password:'LpICjrPxJmxSO5DvKh8m',
    database:'bu18dkxus5zr3k8itrwj'
}); */

connection.connect(e=>{
    if(e){
        console.log(`■ There was an error connecting to DB ${e}`);
        return
    }
    console.log(`■ Connected to db success`);
});

module.exports = connection;