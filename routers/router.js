const express = require('express');
const router = express.Router();
const UsuariosController = require("../core/controllers/Usuario.controller");
const PostController = require("../core/controllers/Posts.controller");

// Rutas para usuarios
router.get("/usuario", UsuariosController.getUsuarios);
router.get("/usuario/:idUsuario", UsuariosController.getUsuariosById);
router.put("/usuario/:idUsuario", UsuariosController.putUsuario);
router.post("/usuario", UsuariosController.saveUsuarios);
router.delete("/usuario/:idUsuario", UsuariosController.deleteUsuario);

// Rutas para posts
router.get("/post", PostController.getPosts);
router.get("/post/:idPost", PostController.getPostsById);
router.put("/post/:idPost", PostController.putPost);
router.post("/post", PostController.savePost);
router.delete("/post/:idPost", PostController.deletePost);

module.exports = router;