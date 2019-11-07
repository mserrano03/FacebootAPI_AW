const tokens = require("./tokens");

exports.tokenMiddleware = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (token) {
        tokens.validateToken(token).then(result => {
            next();
        }).catch(err => {
            res.status(401).json({
                message: "token invalid"
            });
        });
    } else {
        res.status(401).json({
            message: "token not found"
        });
    }
}