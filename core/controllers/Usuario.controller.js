const UsuariosDao = require("../persistence/dao/Usuario.dao");

module.exports = {
    login(req, res) {
        const email = req.headers.email;
        const password = req.headers.password;
        UsuariosDao.loginUser(email, password).then((result) => {
            res.status(201).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    saveUsuarios(req, res) {
        const usuario = req.body;
        UsuariosDao.save(usuario).then((result) => {
            res.status(201).json(result);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    getUsuarios(req, res) {
        const sesion = req.headers;
        try {
            UsuariosDao.getUsuarios(sesion).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUsuariosById(req, res) {
        let idUsuario = req.params.idUsuario;
        const sesion = req.headers;
        try {
            UsuariosDao.getUsuariosById(sesion, idUsuario).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    putUsuario(req, res) {
        let usuario = req.body;
        let idUsuario = req.params.idUsuario;
        const sesion = req.headers;

        try {
            UsuariosDao.updateUsuario(sesion, idUsuario, usuario).then((result) => {
                res.status(200).json("Usuario editado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUsuario(req, res) {
        let idUsuario = req.params.idUsuario;
        let idPost = req.params.idPost;
        const sesion = req.headers;

        try {
            UsuariosDao.deleteUsuario(sesion, idPost, idUsuario).then((result) => {
                res.status(200).json("Usuario eliminado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}