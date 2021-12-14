import { Router } from "express";
import { Auth } from "two-step-auth";
import User from "../models/user";

const router = new Router();

router.get("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("Please enter the OTP send to your email");
    } catch (e) {
        throw e;
    }
});

// Will help us to fetch OTP and send email to the user
async function getOTP(emailId) {
    const { mail, OTP, success } = await Auth(emailId, "Basis Backend");

    if (success) {
        return {
            OTP,
            mail,
        };
    }
    return null;
}

export default router;
