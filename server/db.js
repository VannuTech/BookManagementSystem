const CONFIG = require('./config');
const mysql = require('mysql');

const db = mysql.createConnection({
    database: "grp",
    host: "localhost",
    user: "root",
    password: "Code@12345"
});

module.exports = db;

