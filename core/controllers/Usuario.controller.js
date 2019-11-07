const UsuariosDao = require("../persistence/dao/Usuario.dao");

module.exports = {
    saveUsuarios(request, response) {
        const usuario = request.body;
        UsuariosDao.save(usuario).then((result) => {
            response.status(201).json(result);
        }).catch(err => {
            response.status(500).json(err);
        });
    },
    getUsuarios(req, res) {
        try {
            UsuariosDao.getUsuarios().then((result) => {
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

        try {
            UsuariosDao.getUsuariosById(idUsuario).then((result) => {
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

        try {
            UsuariosDao.updateUsuario(idUsuario, usuario).then((result) => {
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

        try {
            UsuariosDao.deleteUsuario(idUsuario).then((result) => {
                res.status(200).json("Usuario eliminado con exito!");
            }).catch((error) => {
                res.status(500).json(error);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}