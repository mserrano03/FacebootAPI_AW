const mongoose = require("mongoose");
const config = require("../../../config");
const logger = require("../../../utils/logger");

mongoose.connect(config.mongodb.defaultconnection, {
    reconnectTries: Number.MAX_VALUE, // Cuantas veces se va a intentar conectar
    reconnectInterval: 500, // Intervalo de cada intento de coneccion
    poolSize: 10 // 10 conexiones maximas simultaneas
});

mongoose.connection.on("connected", () => {
    logger.info(`Mongoose conected to: ${config.mongodb.defaultconnection}`);
});

mongoose.connection.on("error", (err) => {
    logger.error(`Mongoose error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
    logger.info(`Mongoose disconnected`);
});