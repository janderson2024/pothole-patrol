require("dotenv").config();


const db = require("./connection");

//This is a very basic example of how to make a query with the database
async function exampleRoute(){
    sql = 'SELECT * FROM `users`';
    const [results] = await db.query(sql);
    console.log(results);
}


//This is an example of prepare statements.
//The idea is it replaces the ? with the items in the array

//so db.query('SELECT ? FROM ? WHERE ? = ?', [a,b,c,d]) becomes 'SELECT `a` FROM `b` WHERE `c` = `d`'
//This is for security so if you need to append user data: DO THIS
async function exampleRoutePrepared(){
    const sql = 'SELECT * FROM `users` WHERE `ID` = ? and `city` = ?';
    const [results] = await db.query(sql, [1, "Las Vegas"]);
    console.log(results);
}


exampleRoute();
exampleRoutePrepared();
//after this you should run: db.end()
//this makes sure to clean up the current connection!!