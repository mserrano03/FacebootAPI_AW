const PostsModel = require("../schemas/Posts.schema");
const login = require("./Usuario.dao");

module.exports.save = async function (sesion, post) {
    const email = sesion.email;
    const password = sesion.password;
    const logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        const newPostSchema = new PostsModel(post);
        const result = await newPostSchema.save();
        return result;
    } else {
        console.log("¡Error! No se pudo guardar el post");
    }
}

module.exports.getPosts = async function (sesion) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        const result = await PostsModel.find();
        return result;
    } else {
        const result = await PostsModel.find({ "tipoPost": "Publico" });
        return result;
    }
}

module.exports.getPostById = async function (sesion, idPost) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    const result = await PostsModel.findById(idPost);
    if (logginExitoso != 0) {
        return result;
    } else if ((logginExitoso == 0) && result.tipoPost == "Publico") {
        return result;
    } else {
        console.log("El post buscado es privado, necesitas Iniciar sesion para poder verlo");
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

module.exports.deletePost = async function (sesion, idPost) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let autorDelPost = await PostsModel.findById(idPost);
        if (autorDelPost._idAutor == logginExitoso.id) {
            let result = await PostsModel.findByIdAndDelete(idPost);
            return result;
        } else {
            console.log("Error, no eres el autor del post >:c ");
        }
    } else {
        console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    }
}

module.exports.saveComment = async function (sesion, idPost, comment) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let post = await PostsModel.findById(idPost);
        if (post != null || post != undefined) {
            let result = post.updateOne({ $push: { "comentarios": comment } });
            return result;
        } else {
            console.log("Post no encontrado");
        }
    } else {
        console.log("¡Error! Necesitas iniciar sesion para esta operacion");
    }
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

module.exports.deleteComment = async function (sesion, idPost, idComment) {
    const email = sesion.email;
    const password = sesion.password;
    let logginExitoso = await login.loginUser(email, password);
    if (logginExitoso != 0) {
        let comentario = await PostsModel.find({ "comentarios._id": idComment }, { "comentarios.$": 1 });
        if (comentario != null || comentario != undefined) {
            let autorComment = comentario[0].comentarios[0]._idAutorCom;
            if (logginExitoso.id == autorComment) {
                let result = PostsModel.update({ "_id": idPost }, { $pull: { "comentarios": { "_id": idComment } } });
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