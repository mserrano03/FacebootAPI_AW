const UsuariosModel = require("../schemas/Usuario.schema");

module.exports.loginUser = async function (email, password) {
    let datos = {
        "email": email,
        "password": password
    };

    let usuarioExiste = await UsuariosModel.findOne(datos);

    if (usuarioExiste == null || usuarioExiste == undefined) {
        return 0;
    } else {
        return usuarioExiste;
    }
}

module.exports.save = async function (usuario) {
    const newUsuarioSchema = new UsuariosModel(usuario);
    let amigoExiste = usuario.amigos;
    let contador = 0;

    if (amigoExiste.length == 0) {
        const result = await newUsuarioSchema.save();
        return result;
    } else {
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
}

module.exports.getUsuarios = async function (sesion) {
    const email = sesion.email;
    const password = sesion.password;
    const loginExitoso = await this.loginUser(email, password);
    if (loginExitoso != 0) {
        const result = await UsuariosModel.find();
        return result;
    } else {
        console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    }
}

module.exports.getUsuariosById = async function (sesion, idUsuario) {
    const email = sesion.email;
    const password = sesion.password;
    const loginExitoso = await this.loginUser(email, password);

    if (loginExitoso != 0) {
        const result = await UsuariosModel.findById(idUsuario);
        return result;
    } else {
        console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    }
}

module.exports.updateUsuario = async function (sesion, idUsuario, usuario) {
    const email = sesion.email;
    const password = sesion.password;
    const loginExitoso = await this.loginUser(email, password);

    if (loginExitoso != 0) {
        if (UsuariosModel.findById(idUsuario) != null || UsuariosModel.findById(idUsuario) != undefined) {
            if (loginExitoso.id == idUsuario) {
                let result = await UsuariosModel.findByIdAndUpdate(idUsuario, usuario);
                return result;
            } else {
                console.log("¡ERROR! El usuario no puede ser modificado porque no le pertenece");
            }
        } else {
            console.log("¡ERROR! El usuario no existe");
        }
    } else {
        console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    }
}

module.exports.deleteUsuario = async function (sesion, idUsuario) {
    const email = sesion.email;
    const password = sesion.password;
    const loginExitoso = await this.loginUser(email, password);

    if (loginExitoso != 0) {
        if (UsuariosModel.findById(idUsuario) != null || UsuariosModel.findById(idUsuario) != undefined) {
            if (loginExitoso.id == idUsuario) {
                const result = await UsuariosModel.findByIdAndDelete(idUsuario);
                return result;
            } else {
                console.log("¡ERROR! El usuario no puede ser eliminado porque no le pertenece");
            }
        } else {
            console.log("¡ERROR! El usuario no existe");
        }
    } else {
        console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    }
}