const express = require("express");
const router = new express.Router();
const Post = require("../models/post");
const User = require("../models/user");

router.post("/create-post", async (req, res) => {
    const {
        body: { userId, title },
    } = req;

    try {
        const post = new Post({ userId, title });
        const _id = userId;
        const user = await User.findById(_id);
        await post.save();
        res.status(200).send(
            `${user.firstName}, you've successfully created a post!`
        );
    } catch (error) {
        res.status(404).send(
            "Error while creating post. Please check and try again!"
        );
    }
});

router.put("/add-comment/:post_id", async (req, res) => {
    const {
        body: { userId, text },
        params: { post_id: _id },
    } = req;

    try {
        const { comments } = await Post.findById(_id);
        comments.push({ userId, text });
        await Post.updateOne({ _id }, { comments });
        res.status(200).send("Done!");
    } catch (error) {
        res.status(404).send("Error in adding a comment, please try later!");
    }
});

router.put("/like/:post_id", async (req, res) => {
    const {
        params: { post_id: _id },
        body: { userId },
    } = req;

    try {
        const { likes } = await Post.findById(_id);

        // if already liked don't allow to like again
        if (likes.indexOf(userId) < 0) {
            likes.push(userId);
        }

        await Post.updateOne({ _id }, { likes });
        res.status(200).send("Liked!");
    } catch (error) {
        res.status(404).send("Error occured!");
    }
});

router.delete("/delete-post/:post_id", async (req, res) => {
    const {
        params: { post_id: _id },
    } = req;

    try {
        await Post.findByIdAndDelete(_id);
        res.status(400).send("Deleted successfully!");
    } catch (error) {
        res.status(404).send("Error occured!");
    }
});

router.get("/comments/:post_id", async (req, res) => {
    const {
        params: { post_id: _id },
    } = req;

    try {
        const { comments } = await Post.findById(_id);
        res.send(comments);
    } catch (error) {
        res.status(404).send("Error occured!");
    }
});

module.exports = router;
