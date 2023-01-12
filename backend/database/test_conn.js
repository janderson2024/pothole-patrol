require("dotenv").config();


const db = require("./connection");

//This is a very basic example of how to make a query with the database
async function exampleRoute(){
    sql = 'SELECT * FROM `user`';
    const [results] = await db.query(sql);
    console.log(results);
}


//This is an example of prepare statements.
//The idea is it replaces the ? with the items in the array

//so db.query('SELECT ? FROM ? WHERE ? = ?', [a,b,c,d]) becomes 'SELECT `a` FROM `b` WHERE `c` = `d`'
//This is for security so if you need to append user data: DO THIS
async function exampleRoutePrepared(){
    const sql = 'SELECT * FROM `user` WHERE `user_id` = ?';
    const [results] = await db.query(sql, [1]);
    console.log(results);
}


exampleRoute();
exampleRoutePrepared();