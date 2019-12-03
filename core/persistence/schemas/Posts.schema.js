const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new Schema({
    _idAutor: { type: ObjectId, ref: "Usuario" },
    publico: { type: Boolean, default: false, required: false, maxlength: 50 },
    texto: { type: String, required: false, maxlength: 500 },
    tags: [{ type: String, required: true}],
    uriImage: { type: String, required: false },
    comentarios: {
        type: [{
            _idAutorCom: { type: ObjectId, ref: "Usuario" },
            mensaje: { type: String, required: false, maxlength: 500 }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema, "posts");