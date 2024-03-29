const jwt = require("jsonwebtoken");
const secretPhrase = "facebootAPI123";

exports.generateToken = (user) => {
    return jwt.sign(user, secretPhrase);
}

exports.validateToken = async (token) => {
    const validation = await jwt.verify(token, secretPhrase);
    return validation;
}