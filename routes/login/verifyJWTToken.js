const jwt = require("jsonwebtoken");
const createToken = require("@root/js/login/createToken");

const verifyJWTToken = async (req, res) => {
    const jwtCookie = req.cookies.jwt;

    if (jwtCookie !== undefined) {
        try {
            const decoded = jwt.verify(jwtCookie, process.env.jwt_privateKey);

            const newJwtToken = await createToken(
                decoded.user_id,
                decoded.access_token
            );

            res.cookie("jwt", newJwtToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.send({ user_id: decoded.user_id });
        } catch (err) {
            res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
            res.send({ verify: false, message: "verify jwt failed" });
        }
    } else {
        res.send({ verify: false, message: "jwt not exists" });
    }
};

module.exports = verifyJWTToken;
