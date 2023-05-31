const mysql = require("mysql");

const connection = mysql.createPool({
    host: "34.64.217.13",
    port: '3306',
    user: "root",
    password: "qkrtjddlr00!",
    database: "evento",
    multipleStatements: true
});

module.exports = connection;
