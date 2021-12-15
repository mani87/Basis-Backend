const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: null,
    },
    lastName: {
        type: String,
        trim: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
