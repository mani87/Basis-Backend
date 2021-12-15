const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [{ userId: String, text: String }],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
