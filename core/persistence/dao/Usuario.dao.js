const UsuariosModel = require("../schemas/Usuario.schema");

module.exports.save = async function (usuario) {
    const newUsuarioSchema = new UsuariosModel(usuario);
    let amigoExiste = usuario.amigos;
    let contador = 0;

    for (let index = 0; index < amigoExiste.length; index++) {
        let usuaComp = amigoExiste[index].amigo;
        let amigoReal = await UsuariosModel.findById(usuaComp);
        if (amigoReal != undefined || amigoReal != null) {
            if ((index + 1) < amigoExiste.length) {
                let segUsuaComp = amigoExiste[index + 1].amigo;
                if (usuaComp == segUsuaComp) {
                    console.log("¡Error! Hay registros clonados en la peticion");
                    break
                } else {
                    contador++;
                }
            } else {
                contador++;
            }
        } else {
            console.log("¡Error! ¡Ha ingresado un amigo inexistente!");
            break
        }

        if (contador == amigoExiste.length) {
            const result = await newUsuarioSchema.save();
            console.log(result);
            return result;
        } else {
            console.log("¡Ha ocurrido un error al guardar el Usuario!");
        }
    }
}

module.exports.getUsuarios = async function () {
    const result = await UsuariosModel.find();
    return result;
}

module.exports.getUsuariosById = async function (idUsuario) {
    const result = await UsuariosModel.findById(idUsuario);
    return result;
}

module.exports.updateUsuario = async function (idUsuario, usuario) {
    let result = await UsuariosModel.findByIdAndUpdate(idUsuario, usuario);
    return result;
}

module.exports.deleteUsuario = async function (idUsuario) {
    const result = await UsuariosModel.findByIdAndDelete(idUsuario);
    return result;
}