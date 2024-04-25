require('dotenv').config();
let CONFIG = {}

CONFIG.port = process.env.port || 8081
CONFIG.db_name = "grp",
   CONFIG.db_host = "localhost",
   CONFIG.user_name = "root",
   CONFIG.password = "Code@12345"   
CONFIG.port         = process.env.PORT  || '8080';
CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
module.exports = CONFIG;