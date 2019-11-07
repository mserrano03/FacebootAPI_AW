const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new Schema({
    autor: { type: ObjectId, ref: "Usuario" },
    tipoPost: { type: String, required: false, maxlength: 50 },
    texto: { type: String, required: false, maxlength: 500 },
    tags: { type: String, required: false, maxlength: 100 },
    uriImage: { type: String, required: false },
    comentarios: {
        type: [{
            autor: { type: ObjectId, ref: "Usuario" },
            mensaje: { type: String, required: false, maxlength: 500 }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema, "posts");