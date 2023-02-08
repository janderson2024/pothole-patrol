require("dotenv").config();
const db = require("./connection");


async function getAllPotholes(){
    sql = 'SELECT  * FROM `Potholes`';
    const [results] = await db.query(sql);
    console.log(results);
}

async function getAllUsers(){
    const sql = 'SELECT * FROM `Users`';
    const [results] = await db.query(sql);
    console.log(results);
}

async function getAllReports(){
    const sql = 'SELECT * FROM `Reports`';
    const [results] = await db.query(sql);
    console.log(results);
}



async function main() {
    //console.log(process.env);
    await getAllPotholes();
    await getAllUsers();
    await getAllReports();
    db.end();
}

main();