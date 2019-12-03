const UsuariosModel = require("../schemas/Usuario.schema");
const tokensMiddleware = require("../../../middlewares/tokens");

module.exports.loginUser = async function (usuario) {
    try {
        let usuarioExiste = await UsuariosModel.findOne(usuario);
        if (usuarioExiste == null || usuarioExiste == undefined) {
            return 0;
        } else {
            let token = tokensMiddleware.generateToken({
                _id: usuarioExiste._id,
                nombre: usuarioExiste.email
            });
            usrResult = {
                id: usuarioExiste._id,
                token: token
            }
            return usrResult;
        }
    } catch (error) {
        return 0;
    }
}

module.exports.save = async function (usuario) {
    let edad = 0;
    let date = new Date();
    let actualyear = date.getFullYear();
    let actualmonth = date.getMonth();
    let actualday = date.getDate();

    if (usuario.month > actualmonth) {
        edad = actualyear - usuario.year - 1;
    } else if (usuario.month == actualmonth) {
        if (usuario.day >= actualday) {
            edad = actualyear - usuario.year;
        } else {
            edad = actualyear - usuario.year - 1;
        }
    } else {
        edad = actualyear - usuario.year;
    }

    let signupusr = {
        nombre: `${usuario.nombres} ${usuario.apellidos}`,
        email: usuario.email,
        password: usuario.password,
        edad: edad,
        sexo: usuario.sexo,
        fecha_nacimiento: `${usuario.day}/${usuario.month + 1}/${
            usuario.year
            }`,
        gen_musicales: usuario.musica,
        gen_peliculas: usuario.peliculas,
        amigos: []
    };
    try {
        const newUsuarioSchema = new UsuariosModel(signupusr);
        const result = await newUsuarioSchema.save();
        return result;
    } catch (error) {
        return error;
    }

}

module.exports.getUsuarios = async function () {
    try {
        const result = await UsuariosModel.find();
        return result;
    } catch (error) {
        return error;
    }

    // const email = sesion.email;
    // const password = sesion.password;
    // const loginExitoso = await this.loginUser(email, password);
    // if (loginExitoso != 0) {
    //     const result = await UsuariosModel.find();
    //     return result;
    // } else {
    //     console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    // }
}

module.exports.getUsuariosById = async function (idUsuario) {
    try {
        const result = await UsuariosModel.findById(idUsuario);
        return result;
    } catch (error) {
        return error;
    }


    // const email = sesion.email;
    // const password = sesion.password;
    // const loginExitoso = await this.loginUser(email, password);

    // if (loginExitoso != 0) {

    // } else {
    //     console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    // } 
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