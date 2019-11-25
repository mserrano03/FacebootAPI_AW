const mysql = require("../connection/connection");

module.exports.save = async function (result, operacion) {
    var fecha = new Date();
    var hoy = fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getDate();
    var hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    let fechaActual = hoy + ' ' + hora;
    let usuario = result.email;
    let oper = operacion;
    var values = {
        fecha: fechaActual,
        usuario: usuario,
        operacion: oper
    };

    mysql.query("INSERT INTO logOperaciones SET ?", values, function (error, result) {
        if (error) throw error;
        console.log('Resultado: ', result[0]);
    });
}

module.exports.getLogOperaciones = async function (result, operacion) {
    mysql.query('SELECT * FROM logOperaciones', function (error, result) {
        if (error) throw error;
        console.log('Resultado:', result[0]);
    });
}