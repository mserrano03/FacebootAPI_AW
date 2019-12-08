const express = require('express');
const router = express.Router();
const UsuariosController = require("../core/controllers/Usuario.controller");
const PostController = require("../core/controllers/Posts.controller");
const middlewares = require("../middlewares/middlewares");


// Ruta para Login
router.post("/loginUser", UsuariosController.login);

// Rutas para usuarios
router.get("/usuario", middlewares.tokenMiddleware, UsuariosController.getUsuarios); // Obtener usuarios
router.get("/usuario/:idUsuario", UsuariosController.getUsuariosById, middlewares.tokenMiddleware); // Obtener usuario por ID
router.put("/usuario/:idUsuario", middlewares.tokenMiddleware, UsuariosController.putUsuario); // Editar usuario
router.post("/usuarios", UsuariosController.saveUsuarios); // Agregar usuario
router.delete("/usuario/:idUsuario", middlewares.tokenMiddleware, UsuariosController.deleteUsuario); // Eliminar usuario
router.post("/addfriend",middlewares.tokenMiddleware,UsuariosController.saveFriend);
router.get("/getnoagregados/:idUsuario",middlewares.tokenMiddleware,UsuariosController.getNoAgregados)
// Rutas para posts
router.get("/post", middlewares.tokenMiddleware, PostController.getPosts); // Obtener publicaciones
router.get("/post/:idPost", PostController.getPostsById, middlewares.tokenMiddleware); // Obtener publicacion por ID
router.get("/post/:idUsuario/:idPost", middlewares.tokenMiddleware, PostController.getPostsById); // Obtener publicacion por ID de un usuario
router.get("/posts/:idUsuario", middlewares.tokenMiddleware, PostController.getPostsUsr); // Obtener publicaciones de un usuario
router.put("/post/:idPost", middlewares.tokenMiddleware, PostController.putPost); // Editar publicacion
router.post("/post", middlewares.tokenMiddleware, PostController.savePost); // Agregar publicacion
router.delete("/post/:idPost", middlewares.tokenMiddleware, PostController.deletePost); // Eliminar publicacion

router.post("/post/:idPost", middlewares.tokenMiddleware, PostController.saveComment); // Agregar comentarios
router.put("/post/comment/:idComment", middlewares.tokenMiddleware, PostController.putComment); // Editar comentario
router.delete("/post/:idPost/:idComment", middlewares.tokenMiddleware, PostController.deleteComment); // Eliminar comentario

router.get("/search", middlewares.tokenMiddleware, PostController.searchPosts); // Buscar publicacion
router.post("/upload/profileImage", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No hay archivo');
    }
    let sampleFile = req.body.sampleFile;
    res.send(req);
    // let name = Math.random().toString(36).substr(2, 9);

    // sampleFile.mv(`./core/assets/profileImages/${name}.jpg`, function (err) {
    //     if (err) { return res.status(500).send(err); }
    //     res.send('File uploaded!');
    // });
});
router.post("/upload/post", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No hay archivo');
    }
    let sampleFile = req.files.sampleFile;
    let name = Math.random().toString(36).substr(2, 9);

    sampleFile.mv(`./core/assets/posts/${name}.jpg`, function (err) {
        if (err) { return res.status(500).send(err); }
        res.send('File uploaded!');
    });
});
router.get("/images/profile/:nombreimg", (req, res) => {
    const nombreimg = req.params.nombreimg;
    res.sendFile(process.cwd()+`/core/assets/profileImages/${nombreimg}`);
});
router.get("/images/post/:nombreimg", (req, res) => {
    const nombreimg = req.params.nombreimg;
    res.sendFile(process.cwd()+`/core/assets/posts/${nombreimg}`);
});
module.exports = router;