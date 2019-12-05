const PostsModel = require("../schemas/Posts.schema");
const UsuariosModel = require("../schemas/Usuario.schema");
const login = require("./Usuario.dao");
const tokens = require("../../../middlewares/tokens");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.save = async function (post) {
    try {
        const newPostSchema = new PostsModel(post);
        const result = await newPostSchema.save();
        if (result == null || result == undefined) {
            return 0;
        } else {
            let autor = await UsuariosModel.findOne(result._idAutor);
            let fecha = `${result.createdAt.getDate()}/${result.createdAt.getMonth() + 1}/${result.createdAt.getFullYear()}`;
            let hora = `${result.createdAt.getHours()}:${result.createdAt.getMinutes()}`;
            let post = {
                id: result._id,
                idAutor: result._idAutor,
                autor: autor.nombre,
                texto: result.texto,
                tags: result.tags,
                uriImage: result.uriImage,
                comentarios: result.comentarios,
                publico: result.publico,
                fecha: fecha,
                hora: hora
            }
            return post;
        }

    } catch (error) {
        return error;
    }
}

module.exports.getPosts = async function (usrid) {
    try {
        const result = await PostsModel.find().sort({
            'createdAt': 'desc'
        });
        let posts = [];
        if (result == null || result == undefined) {
            return 0;
        } else {
            for (p of result) {
                let autor = await UsuariosModel.findOne(p._idAutor);
                let fecha = `${p.createdAt.getDate()}/${p.createdAt.getMonth() + 1}/${p.createdAt.getFullYear()}`;
                let hora = `${p.createdAt.getHours()}:${p.createdAt.getMinutes()}`;
                let comentarios = [];
                if (p.comentarios.length != 0) {
                    for (c of p.comentarios) {
                        let autorCom = await UsuariosModel.findOne(c._idAutorCom);
                        let comentario = {
                            id: c._id,
                            idAutor: c._idAutorCom,
                            nombreAutor: autorCom.nombre,
                            mensaje: c.mensaje
                        }
                        comentarios.push(comentario);
                    }
                }

                let post = {
                    id: p._id,
                    idAutor: p._idAutor,
                    autor: autor.nombre,
                    texto: p.texto,
                    tags: p.tags,
                    uriImage: p.uriImage,
                    comentarios: comentarios,
                    fecha: fecha,
                    hora: hora,
                    publico: p.publico
                }
                posts.push(post);
            }
            return posts;
        }
    } catch (error) {
        return error;
    }
}

module.exports.getPostById = async function (idPost) {
    try {
        const result = await PostsModel.findById(idPost);
        if (result == null || result == undefined) {
            return 0;
        } else {
            let autor = await UsuariosModel.findOne(result._idAutor);
            let fecha = `${result.createdAt.getDate()}/${result.createdAt.getMonth() + 1}/${result.createdAt.getFullYear()}`;
            let hora = `${result.createdAt.getHours()}:${result.createdAt.getMinutes()}`;
            let comentarios = [];
            if (result.comentarios.length != 0) {
                for (c of result.comentarios) {
                    let autorCom = await UsuariosModel.findOne(c._idAutorCom);
                    let comentario = {
                        id: c._id,
                        idAutor: c._idAutorCom,
                        nombreAutor: autorCom.nombre,
                        mensaje: c.mensaje
                    }
                    comentarios.push(comentario);
                }
            }
            let post = {
                id: result._id,
                idAutor: result._idAutor,
                autor: autor.nombre,
                texto: result.texto,
                tags: result.tags,
                uriImage: result.uriImage,
                comentarios: result.comentarios,
                publico: result.publico,
                fecha: fecha,
                hora: hora,
                comentarios:comentarios
            }
            return post;
        }
    } catch (error) {
        return error;
    }
    // const email = sesion.email;
    // const password = sesion.password;
    // let logginExitoso = await login.loginUser(email, password);
    // const result = await PostsModel.findById(idPost);
    // if (logginExitoso != 0) {
    //     return result;
    // } else if ((logginExitoso == 0) && result.tipoPost == "Publico") {
    //     return result;
    // } else {
    //     console.log("El post buscado es privado, necesitas Iniciar sesion para poder verlo");
    // }
}

module.exports.getPostsUsr = async function (usrid) {
    try {
        const result = await PostsModel.find({ "_idAutor": usrid }).sort({
            'createdAt': 'desc'
        });
        let posts = [];
        if (result == null || result == undefined) {
            return 0;
        } else {
            for (p of result) {
                let autor = await UsuariosModel.findOne(p._idAutor);
                let fecha = `${p.createdAt.getDate()}/${p.createdAt.getMonth() + 1}/${p.createdAt.getFullYear()}`;
                let hora = `${p.createdAt.getHours()}:${p.createdAt.getMinutes()}`;
                let comentarios = [];
                if (p.comentarios.length != 0) {
                    for (c of p.comentarios) {
                        let autorCom = await UsuariosModel.findOne(c._idAutorCom);
                        let comentario = {
                            id: c._id,
                            idAutor: c._idAutorCom,
                            nombreAutor: autorCom.nombre,
                            mensaje: c.mensaje
                        }
                        comentarios.push(comentario);
                    }
                }

                let post = {
                    id: p._id,
                    idAutor: p._idAutor,
                    autor: autor.nombre,
                    texto: p.texto,
                    tags: p.tags,
                    uriImage: p.uriImage,
                    comentarios: comentarios,
                    fecha: fecha,
                    hora: hora,
                    publico: p.publico
                }
                posts.push(post);
            }
            return posts;
        }
    } catch (error) {
        return 0;
    }



}

module.exports.updatePost = async function (sesion, idPost, post) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let autorDelPost = await PostsModel.findById(idPost);
        if (autorDelPost._idAutor == logginExitoso.id) {
            let result = await PostsModel.findByIdAndUpdate(idPost, post);
            return result;
        } else {
            console.log("Error, no eres el autor del post >:c ");
        }
    } else {
        console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    }
}

module.exports.deletePost = async function (idPost) {
    try {
        let result = await PostsModel.findByIdAndDelete(idPost);
        return result;
    } catch (error) {
        return error;
    }

    // const email = sesion.email;
    // const password = sesion.password;
    // let logginExitoso = await login.loginUser(email, password);
    // if (logginExitoso != 0) {
    //     let autorDelPost = await PostsModel.findById(idPost);
    //     if (autorDelPost._idAutor == logginExitoso.id) {
    //         let result = await PostsModel.findByIdAndDelete(idPost);
    //         return result;
    //     } else {
    //         console.log("Error, no eres el autor del post >:c ");
    //     }
    // } else {
    //     console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    // }
}

module.exports.saveComment = async function (comment) {
    try {
        const idpost = comment.idpost;
        const comentario = comment.comentario;
        let post = await PostsModel.findById(idpost);
        if (post != null || post != undefined) {
            let result = post.updateOne({ $push: { "comentarios": comentario } });
            return result;
        } else {
            console.log("Post no encontrado");
        }
    } catch (error) {
        return error;
    }


    // const email = sesion.email;
    // const password = sesion.password;
    // let logginExitoso = await login.loginUser(email, password);
    // if (logginExitoso != 0) {
    //     let post = await PostsModel.findById(idPost);
    //     if (post != null || post != undefined) {
    //         let result = post.updateOne({ $push: { "comentarios": comment } });
    //         return result;
    //     } else {
    //         console.log("Post no encontrado");
    //     }
    // } else {
    //     console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    // }
}

module.exports.updateComment = async function (sesion, idComment, comment) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let comentario = await PostsModel.find({ "comentarios._id": idComment }, { "comentarios.$": 1 });
        if (comentario != null || comentario != undefined) {
            let autorComment = comentario[0].comentarios[0]._idAutorCom;
            if (logginExitoso.id == autorComment) {
                let result = await PostsModel.update({ "comentarios._id": idComment }, { $set: { "comentarios.$.mensaje": comment.mensaje } });
                return result;
            } else {
                console.log("No entro");
            }
        } else {
            console.log("Post no encontrado");
        }
    } else {
        console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    }
}

module.exports.deleteComment = async function (idPost, idComment) {
    let comentario = await PostsModel.find({ "comentarios._id": idComment }, { "comentarios.$": 1 });
    if (comentario != null || comentario != undefined) {
        let result = PostsModel.update({ "_id": idPost }, { $pull: { "comentarios": { "_id": idComment } } });
        return result;
    } else {
        console.log("Post no encontrado");
    }
    // const email = sesion.email;
    // const password = sesion.password;
    // let logginExitoso = await login.loginUser(email, password);
    // if (logginExitoso != 0) {
    //     let comentario = await PostsModel.find({ "comentarios._id": idComment }, { "comentarios.$": 1 });
    //     if (comentario != null || comentario != undefined) {
    //         let autorComment = comentario[0].comentarios[0]._idAutorCom;
    //         if (logginExitoso.id == autorComment) {
    //             let result = PostsModel.update({ "_id": idPost }, { $pull: { "comentarios": { "_id": idComment } } });
    //             return result;
    //         } else {
    //             console.log("No entro");
    //         }
    //     } else {
    //         console.log("Post no encontrado");
    //     }
    // } else {
    //     console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    // }
}

module.exports.searchPosts = async function (sesion) {
    const email = sesion.email;
    const password = sesion.password;
    const palabra = sesion.palabra;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let result = await PostsModel.find({ $or: [{ "tags": palabra }] });
        return result;
    } else {
        console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    }
}