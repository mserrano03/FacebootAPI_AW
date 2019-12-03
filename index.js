const express = require("express");
const morgan = require("morgan");
const loger = require("./utils/logger");
const app = express();
require("./core/persistence/connection/connection");
const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());
//SETTINGS
app.set("port", process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token,usrid");
    next();
});
app.use("/", require("./routers/router"));


//STAR SERVER
app.listen(app.get("port"), () => {
    loger.info(`Server running at ${app.get("port")}`);
});