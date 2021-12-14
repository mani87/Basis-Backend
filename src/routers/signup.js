const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.get('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

    } catch (e) {
        throw e;
    }
}) 

module.exports = router;