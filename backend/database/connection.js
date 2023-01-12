const mysql = require('mysql2/promise');

const SQL_OPTIONS = {
    host : process.env.SQL_HOST,
    user : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DB,
    supportBigNumbers : true,
    connectionLimit: 10,
};

const pool = mysql.createPool(SQL_OPTIONS);

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });

module.exports = pool;