const PostsDao = require("../persistence/dao/Post.dao");

module.exports = {
    savePost(request, response) {
        const post = request.body;
        const sesion = request.headers;
        PostsDao.save(sesion, post).then((result) => {
            response.status(201).json("Publicacion guardada con exito!");
        }).catch(err => {
            response.status(500).json(err);
        });
    },
    getPosts(req, res) {
        const sesion = req.headers;
        try {
            PostsDao.getPosts(sesion).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getPostsById(req, res) {
        let idPost = req.params.idPost;
        const sesion = req.headers;

        try {
            PostsDao.getPostById(sesion, idPost).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    putPost(req, res) {
        let post = req.body;
        let idPost = req.params.idPost;
        const sesion = req.headers;

        try {
            PostsDao.updatePost(sesion, idPost, post).then((result) => {
                res.status(200).json("Post editado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deletePost(req, res) {
        let idPost = req.params.idPost;
        const sesion = req.headers;

        try {
            PostsDao.deletePost(sesion, idPost).then((result) => {
                res.status(200).json("Post eliminado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    saveComment(request, response) {
        const comment = request.body;
        const idPost = request.params.idPost;
        const sesion = request.headers;

        PostsDao.saveComment(sesion, idPost, comment).then((result) => {
            response.status(201).json("Comentario guardado con exito!");
        }).catch(err => {
            response.status(500).json(err);
        });
    },
    putComment(req, res) {
        const comment = req.body;
        let idComment = req.params.idComment;
        const sesion = req.headers;

        try {
            PostsDao.updateComment(sesion, idComment, comment).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteComment(req, res) {
        let idComment = req.params.idComment;
        let idPost = req.params.idPost;
        const sesion = req.headers;

        try {
            PostsDao.deleteComment(sesion, idPost, idComment).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchPosts(req, res) {
        const sesion = req.headers;
        try {
            PostsDao.searchPosts(sesion).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}