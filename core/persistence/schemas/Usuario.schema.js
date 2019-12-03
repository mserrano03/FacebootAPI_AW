const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const GenMusicales = require("../enums/GenMusica.enums");
const GenPeliculas = require("../enums/GenPelicula.enums");

const usuarioSchema = new Schema({
    email: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 },
    nombre: { type: String, required: true, maxlength: 50 },
    edad: { type: Number, required: true, min: 15, max: 100 },
    sexo: { type: String, required: true },
    fecha_nacimiento: { type: String, required: true },
    gen_musicales: [{ type: String, required: true, enum: GenMusicales.getAll() }],
    gen_peliculas: [{ type: String, required: true, enum: GenPeliculas.getAll() }],
    amigos: {
        type: [{
            amigo: { type: ObjectId, ref: "Usuario" }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model("Usuario", usuarioSchema, "usuarios");