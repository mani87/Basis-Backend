const { Auth } = require("two-step-auth");

// to fetch OTP and send email of the user
async function getOTP(emailId) {
    const { mail, OTP, success } = await Auth(emailId, "Basis Backend");

    if (success) {
        return {
            otp: OTP,
            mail,
        };
    }
    return null;
}

module.exports = getOTP;
