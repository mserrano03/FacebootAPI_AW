const express = require('express');
const router = express.Router();
const UsuariosController = require("../core/controllers/Usuario.controller");
const PostController = require("../core/controllers/Posts.controller");

// Ruta para Login
router.get("/loginUser", UsuariosController.login);

// Rutas para usuarios
router.get("/usuario", UsuariosController.getUsuarios); // Obtener usuarios
router.get("/usuario/:idUsuario", UsuariosController.getUsuariosById); // Obtener usuario por ID
router.put("/usuario/:idUsuario", UsuariosController.putUsuario); // Editar usuario
router.post("/usuario", UsuariosController.saveUsuarios); // Agregar usuario
router.delete("/usuario/:idUsuario", UsuariosController.deleteUsuario); // Eliminar usuario

// Rutas para posts
router.get("/post", PostController.getPosts); // Obtener publicaciones
router.get("/post/:idPost", PostController.getPostsById); // Obtener publicacion por ID
router.put("/post/:idPost", PostController.putPost); // Editar publicacion
router.post("/post", PostController.savePost); // Agregar publicacion
router.delete("/post/:idPost", PostController.deletePost); // Eliminar publicacion

router.post("/post/:idPost", PostController.saveComment); // Agregar comentarios
router.put("/post/comment/:idComment", PostController.putComment); // Editar comentario
router.delete("/post/:idPost/:idComment", PostController.deleteComment); // Eliminar comentario

router.get("/search", PostController.searchPosts); // Buscar publicacion

module.exports = router;