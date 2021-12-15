const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const getOTP = require("../utils/utils");

router.post(`/login/`, async (req, res) => {
    const {
        body: { email },
    } = req;

    try {
        // saving otp in the db for now, we can save it on the frontend side
        // as it is not ideal to use it on server side
        const { otp } = await getOTP(email);
        const user = await User.find({ email });

        if (user) {
            // Update the OTP
            await User.updateOne({ email }, { otp });
        } else {
            res.status(404).send("No such user, please complete registration.");
        }
        res.status(200).send(
            `Please enter the OTP send to your email ${email}`
        );
    } catch (e) {
        res.status(404).send("Request failed!!");
    }
});

router.post(`/login/verify-otp/:email`, async (req, res) => {
    const {
        body: { otp },
        params: { email },
    } = req;

    try {
        const user = await User.findOne({ email });
        await User.updateOne({ email }, { isVerified: otp == user.otp });

        if (otp == user.otp) {
            const user = await User.findOne({ email });

            if (user.firstName && user.lastName) {
                res.send(user);
            } else {
                res.status(404).send(
                    "No such user, please complete registration."
                );
            }
        } else {
            res.status(404).send("Invaild OTP");
        }
    } catch (err) {
        res.send("Request Failed!");
    }
});

module.exports = router;
