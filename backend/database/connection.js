const mysql = require('mysql2/promise');

const SQL_OPTIONS = {
    host : process.env.SQL_HOST,
    user : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DB,
    supportBigNumbers : true
};

async function query(sql, params) {
    const connection = await mysql.createConnection(SQL_OPTIONS);
    const [results] = await connection.execute(sql, params);
    return results;
  }
  
  module.exports = {query};