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
        let amigos = [];
        if (result != null || result != undefined) {
            for (let a of result.amigos) {
                const amigo = await UsuariosModel.findById(a.amigo);
                let amigui = {
                    _id: a._id,
                    amigo: a.amigo,
                    nombre: amigo.nombre
                };
                amigos.push(amigui);
            }
            let usr = {
                _id: result._id,
                gen_musicales: result.gen_musicales,
                gen_peliculas: result.gen_peliculas,
                nombre: result.nombre,
                email: result.email,
                password: result.password,
                edad: result.edad,
                sexo: result.sexo,
                fecha_nacimiento: result.fecha_nacimiento,
                amigos: amigos
            }
            return usr;
        }
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

module.exports.updateUsuario = async function (usuario) {
    let signupusr = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        edad: usuario.edad,
        sexo: usuario.sexo,
        fecha_nacimiento: usuario.fecha_nacimiento,
        gen_musicales: usuario.gen_musicales,
        gen_peliculas: usuario.gen_peliculas,
        amigos: usuario.amigos
    };
    try {
        let result = await UsuariosModel.findByIdAndUpdate(usuario._id, signupusr);
        return result;
    } catch (error) {
        return error;
    }

    // const email = sesion.email;
    // const password = sesion.password;
    // const loginExitoso = await this.loginUser(email, password);

    // if (loginExitoso != 0) {
    //     if (UsuariosModel.findById(idUsuario) != null || UsuariosModel.findById(idUsuario) != undefined) {
    //         if (loginExitoso.id == idUsuario) {
    //             let result = await UsuariosModel.findByIdAndUpdate(idUsuario, usuario);
    //             return result;
    //         } else {
    //             console.log("¡ERROR! El usuario no puede ser modificado porque no le pertenece");
    //         }
    //     } else {
    //         console.log("¡ERROR! El usuario no existe");
    //     }
    // } else {
    //     console.log("¡Atencion! Se requiere inicio de sesion correcto para esta operacion");
    // }
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

module.exports.saveFriend = async function (friend) {
    try {
        const usrid = friend.idusr;
        const friendid = friend.idfriend;
        const amigo = {
            "_idAmigo": friendid
        }
        let usr = await UsuariosModel.findById(usrid);
        if (usr != null || usr != undefined) {
            let result = usr.updateOne({ $push: { "amigos": { 'amigo': friendid } } });
            return result;
        } else {
            console.log("Post no encontrado");
        }
    } catch (error) {
        return error;
    }
}

module.exports.getNoAgregados = async function (usrid) {
    try {
        const result = await UsuariosModel.findById(usrid);
        const usuarios = await UsuariosModel.find();
        let noagregados = [];
        if ((result != null || result != undefined) && result.amigos.length != 0) {
            
            if (usuarios != null || usuarios != undefined) {
                for (let a of usuarios) {
                    let c = 0;
                    for (let f of result.amigos) {
                        if (f.amigo.toString() != a._id.toString() && a._id.toString() != usrid) {
                            c++;
                        }
                        if (c == result.amigos.length) {
                            noagregados.push(a);
                        }
                    }
                }
            }
            return noagregados;
        }
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