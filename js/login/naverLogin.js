const Axios = require("axios");

const userExists = require("./userExists");
const createToken = require("./createToken");

const client_id = process.env.naver_client_id;
const client_secret = process.env.naver_client_secret;
const redirect_uri = process.env.naver_redirect_uri;

const naverLogin = {
    naver_oauth2_code: async (code, state) => {
        try {
            const response = await Axios.post(
                "https://nid.naver.com/oauth2.0/token",
                null,
                {
                    params: {
                        grant_type: "authorization_code",
                        client_id,
                        client_secret,
                        code,
                        state,
                        redirect_url: redirect_uri,
                    },
                }
            );

            const userResponse = await Axios.get(
                "https://openapi.naver.com/v1/nid/me",
                {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`,
                    },
                }
            );

            const userInfo = {
                user_id: userResponse.data.response.id,
            };

            await userExists(userInfo);

            return createToken(
                userResponse.data.response.id,
                response.data.access_token
            );
        } catch (error) {
            console.error(error.response.data);
            return error.response.status;
        }
    },
};

module.exports = naverLogin;
