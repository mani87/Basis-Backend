const express = require("express");
const User = require("../models/user");
const getOTP = require("../utils/utils");

const router = new express.Router();

router.post(`/signup/`, async (req, res) => {
    const {
        body: { email },
    } = req;

    try {
        // saving otp in the db for now, we can save it on the frontend side
        // as it is not ideal to use it on server side
        const { otp } = await getOTP(email);
        const user = await User.findOne({ email });

        if (user) {
            // user already there, update the OTP
            await User.updateOne({ email }, { otp });
        } else {
            const user = new User({
                email,
                otp: String(otp),
            });
            await user.save();
        }
        res.status(200).send(
            `Please enter the OTP send to your email ${email}`
        );
    } catch (e) {
        res.status(404).send(`Request failed!!`);
    }
});

router.post(`/signup/verify-otp/:email`, async (req, res) => {
    const {
        body: { otp },
        params: { email },
    } = req;

    try {
        const user = await User.findOne({ email });
        await User.updateOne({ email }, { isVerified: otp == user.otp });

        if (otp == user.otp) {
            res.send("OTP verification successful.");
        } else {
            res.status(404).send("Invaild OTP");
        }
    } catch (err) {
        res.send("Request Failed!");
    }
});

router.post(`/signup/user-details/:email`, async (req, res) => {
    const {
        params: { email },
        body: { firstName, lastName },
    } = req;

    try {
        const user = await User.findOne({ email });

        if (user.isVerified) {
            await User.updateOne({ email }, { firstName, lastName });
            res.send("Sign up successfully!");
        } else {
            res.send(
                "Verification is still pending, please verify your email."
            );
        }
    } catch (err) {
        res.send("Error occured!!");
    }
});

module.exports = router;
