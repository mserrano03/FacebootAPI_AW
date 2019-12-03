const PostsDao = require("../persistence/dao/Post.dao");
const InfoDao = require("../persistence/dao/Info.dao");
const logger = require("../../utils/logger");

module.exports = {
    savePost(request, response) {
        const post = request.body;
        const operacion = "Guardar publicacion";

        PostsDao.save(post).then((result) => {
            response.status(201).json(result);
            InfoDao.save(result, operacion);
            logger.info(result);
        }).catch(err => {
            response.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(err);
        });
    },
    getPosts(req, res) {
        const operacion = "Buscar publicaciones";
        PostsDao.getPosts().then((result) => {
            res.status(200).json({ posts: result });
            InfoDao.save(result, operacion);
            logger.info(result);
        }).catch((error) => {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        });
    },
    getPostsById(req, res) {
        let idPost = req.params.idPost;
        const operacion = "Buscar publicaciones por ID";

        try {
            PostsDao.getPostById(idPost).then((result) => {
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
    getPostsUsr(req, res) {
        const usrid = req.params.idUsuario;
        const operacion = "Buscar publicaciones por usuario";
        try {
            PostsDao.getPostsUsr(usrid).then((result) => {
                if (result === 0) {
                    res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                    logger.info(error);
                } else {
                    res.status(200).json({ posts: result });
                    InfoDao.save(result, operacion);
                    logger.info(result);
                }
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    },
    getPostsByIdAndUsr(req, res) {
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
        const operacion = "Eliminar publicacion";

        try {
            PostsDao.deletePost(idPost).then((result) => {
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
        const operacion = "Guardar comentario";

        PostsDao.saveComment(comment).then((result) => {
            response.status(201).json(result);
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
        const operacion = "Eliminar comentario";

        try {
            PostsDao.deleteComment(idPost, idComment).then((result) => {
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