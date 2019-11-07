const PostsDao = require("../persistence/dao/Post.dao");

module.exports = {
    savePost(request, response) {
        const post = request.body;
        PostsDao.save(post).then((result) => {
            response.status(201).json("Publicacion guardada con exito!");
        }).catch(err => {
            response.status(500).json(err);
        });
    },
    getPosts(req, res) {
        try {
            PostsDao.getPosts().then((result) => {
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

        try {
            PostsDao.getPostById(idPost).then((result) => {
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

        try {
            PostsDao.updatePost(idPost, post).then((result) => {
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

        try {
            PostsDao.deletePost(idPost).then((result) => {
                res.status(200).json("Post eliminado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}