const UsuariosDao = require("../persistence/dao/Usuario.dao");
const InfoDao = require("../persistence/dao/Info.dao");
const logger = require("../../utils/logger");
const tokensMiddleware = require("../../middlewares/tokens");

module.exports = { 
    login(req, res) {
        const usuario = req.body;
        const operacion = "Login";
        UsuariosDao.loginUser(usuario).then((result) => {
            if (result === 0) {
                res.status(404).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.info(err);
            } else {
                res.status(200).json(result);
                InfoDao.save(result, operacion);
                logger.info(result);
            }
        }).catch(err => {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(err);
        });
    },
    saveUsuarios(req, res) {
        const usuario = req.body;
        const operacion = "Guardar usuarios";

        UsuariosDao.save(usuario).then((result) => {
            res.status(201).json("¡Exito! Se ha guardado el usuario correctamente");
            InfoDao.save(result, operacion);
            logger.info(result);
        }).catch(err => {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(err);
        });
    },
    getUsuarios(req, res) {
        //const sesion = req.headers;
        const operacion = "Buscar usuarios";

        try {
            UsuariosDao.getUsuarios().then((result) => {
                res.status(200).json({ usuarios: result });
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
    getUsuariosById(req, res) {
        let idUsuario = req.params.idUsuario;
        const operacion = "Buscar usuario por ID";

        try {
            UsuariosDao.getUsuariosById(idUsuario).then((result) => {
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
    putUsuario(req, res) {
        let usuario = req.body;
        let idUsuario = req.params.idUsuario;
        const sesion = req.headers;
        const operacion = "Editar usuario";

        try {
            UsuariosDao.updateUsuario(sesion, idUsuario, usuario).then((result) => {
                res.status(200).json("¡Exito! Se ha editado el usuario satisfactoriamente");
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
    deleteUsuario(req, res) {
        let idUsuario = req.params.idUsuario;
        let idPost = req.params.idPost;
        const sesion = req.headers;
        const operacion = "Eliminar Usuario";

        try {
            UsuariosDao.deleteUsuario(sesion, idPost, idUsuario).then((result) => {
                res.status(200).json("¡Exito! Se ha eliminado el usuario satisfactoriamente");
                InfoDao.save(result, operacion);
                logger.info(result);
            }).catch((error) => {
                res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
                logger.iunfo(error);
            });
        } catch (error) {
            res.status(500).json("¡Ha ocurrido un problema, porfavor verifique los datos y vuelva a intentarlo");
            logger.info(error);
        }
    }
}