const PostsModel = require("../schemas/Posts.schema");

module.exports.save = async function (post) {
    const newPostSchema = new PostsModel(post);
    const result = await newPostSchema.save();
    return result;
}

module.exports.getPosts = async function () {
    const result = await PostsModel.find();
    return result;
}

module.exports.getPostById = async function (idPost) {
    const result = await PostsModel.findById(idPost);
    return result;
}

module.exports.updatePost = async function (idPost, post) {
    let result = await PostsModel.findByIdAndUpdate(idPost, post);
    return result;
}

module.exports.deletePost = async function (idPost) {
    const result = await PostsModel.findByIdAndDelete(idPost);
    return result;
}