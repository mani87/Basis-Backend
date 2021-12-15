const mongoose = require("mongoose");
const User = require("../models/user");

const postSchema = new mongoose.Schema({});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
