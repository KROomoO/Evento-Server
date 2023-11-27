const Axios = require("axios");

const userExists = require("./userExists");
const createToken = require("./createToken");

const grant_type = "authorization_code";
const client_id = process.env.kakao_client_id;
const redirect_uri = process.env.kakao_redirect_uri;

const kakaoLogin = {
    kakao_oAuth_code: async (code, state) => {
        try {
            const response = await Axios.post(
                "https://kauth.kakao.com/oauth/token",
                null,
                {
                    params: {
                        grant_type,
                        client_id,
                        redirect_uri,
                        code,
                        state,
                    },
                },
                {
                    headers: {
                        "Content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                        Autorization: "Bearer",
                    },
                }
            );
            const userResponse = await Axios.get(
                "https://kapi.kakao.com/v2/user/me",
                {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`,
                        "Content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );

            const userInfo = {
                user_id: userResponse.data.id,
            };

            const checkUser = await userExists(userInfo);

            console.log(checkUser);

            return createToken(
                userResponse.data.id,
                response.data.access_token
            );
        } catch (error) {
            console.error(error.response.data);
            return error.response.status;
        }
    },
};

module.exports = kakaoLogin;
