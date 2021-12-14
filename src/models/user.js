import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
    },
});

const User = model("User", userSchema);

export default User;
