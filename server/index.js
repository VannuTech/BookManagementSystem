const express = require ("express");
const CONFIG = require('../server/config.js')
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = CONFIG.port || 3000;


app.listen(PORT, ()=> {
    console.log(`app is listening at port  ${PORT}`);
})
app.connect(2)
app.use(express.json())
app.use("/api/v1", require("./routes/routes.js"))

//path
//http://localhost:8081/api/v1/getcontacts