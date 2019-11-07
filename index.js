const express = require("express");
const morgan = require("morgan");
const loger = require("./utils/logger");
const tokensMiddleware = require("./middlewares/tokens");
const middlewares = require("./middlewares/middlewares");
const app = express();
require("./core/persistence/connection/connection");

//SETTINGS
app.set("port", process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(middlewares.tokenMiddleware);

//ROUTES
app.use("/", require("./routers/router"));

//STAR SERVER
app.listen(app.get("port"), () => {
    loger.info(`Server running at ${app.get("port")}`);
});

const token = tokensMiddleware.generateToken({
    _id: "q1w2e3r4t5",
    nombre: "Marco Serrano"
});
console.log(token);