const PostsDao = require("../persistence/dao/Post.dao");
const InfoDao = require("../persistence/dao/Info.dao");
const logger = require("../../utils/logger");

module.exports = {
    savePost(request, response) {
        const post = request.body;
        const sesion = request.headers;
        const operacion = "Guardar publicacion";

        PostsDao.save(sesion, post).then((result) => {
            response.status(201).json("¡Exito! Se ha subido su publicacion satisfacoriamente");
            InfoDao.save(result, operacion);
            logger.info(result);
        }).catch(err => {
            response.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(err);
        });
    },
    getPosts(req, res) {
        const sesion = req.headers;
        const operacion = "Buscar publicaciones";

        try {
            PostsDao.getPosts(sesion).then((result) => {
                res.status(200).json(result);
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    getPostsById(req, res) {
        let idPost = req.params.idPost;
        const sesion = req.headers;
        const operacion = "Buscar publicaciones por ID";

        try {
            PostsDao.getPostById(sesion, idPost).then((result) => {
                res.status(200).json(result);
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    putPost(req, res) {
        let post = req.body;
        let idPost = req.params.idPost;
        const sesion = req.headers;
        const operacion = "Editar publicacion";

        try {
            PostsDao.updatePost(sesion, idPost, post).then((result) => {
                res.status(200).json("¡Exito! Se ha editado su publicacion satisfactoriamente");
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    deletePost(req, res) {
        let idPost = req.params.idPost;
        const sesion = req.headers;
        const operacion = "Eliminar publicacion";

        try {
            PostsDao.deletePost(sesion, idPost).then((result) => {
                res.status(200).json("¡Exito! Se ha eliminado su publicacion satisfactoriamente");
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    saveComment(request, response) {
        const comment = request.body;
        const idPost = request.params.idPost;
        const sesion = request.headers;
        const operacion = "Guardar comentario";

        PostsDao.saveComment(sesion, idPost, comment).then((result) => {
            response.status(201).json("¡Exito! Se ha publicado su comentario satisfactoriamente");
            InfoDao.save(result, operacion);
            logger.info(result);
        }).catch(err => {
            response.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(err);
        });
    },
    putComment(req, res) {
        const comment = req.body;
        let idComment = req.params.idComment;
        const sesion = req.headers;
        const operacion = "Editar comentario";

        try {
            PostsDao.updateComment(sesion, idComment, comment).then((result) => {
                res.status(200).json("¡Exito! Se ha editado su comentario satisfactoriamente");
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    deleteComment(req, res) {
        let idComment = req.params.idComment;
        let idPost = req.params.idPost;
        const sesion = req.headers;
        const operacion = "Eliminar comentario";

        try {
            PostsDao.deleteComment(sesion, idPost, idComment).then((result) => {
                res.status(200).json("¡Exito! Se ha eliminado su comentario satisfactoriamente");
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    searchPosts(req, res) {
        const sesion = req.headers;
        const operacion = "Buscar por filtro";

        try {
            PostsDao.searchPosts(sesion).then((result) => {
                res.status(200).json(result);
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    }
}