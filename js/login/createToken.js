const jwt = require("jsonwebtoken");

const secretKey = process.env.jwt_privateKey;

const createToken = async (user_id, access_token) => {
    const payload = {
        user_id,
        access_token,
    };

    const jwtToken = jwt.sign(payload, secretKey, {
        expiresIn: "30 days",
    });

    return jwtToken;
};

module.exports = createToken;
