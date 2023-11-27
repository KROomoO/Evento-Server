const { OAuth2Client } = require("google-auth-library");

const userExists = require("./userExists");
const createToken = require("./createToken");

const clientId = process.env.google_client_id;
const clientSecret = process.env.google_client_secret;
const redirectUri = process.env.google_redirect_uri;

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

const googleLogin = {
    google_oAuth2_code: async (code) => {
        try {
            console.log(code);
            const { tokens } = await oAuth2Client.getToken(code);
            console.log(tokens);
            oAuth2Client.setCredentials(tokens);

            console.log(oAuth2Client);
            const { data } = await oAuth2Client.request({
                url: "https://www.googleapis.com/oauth2/v2/userinfo",
            });

            console.log(data);

            const userInfo = {
                user_id: data.id,
                refresh_token: oAuth2Client.credentials.refresh_token,
            };

            const checkUser = await userExists(userInfo);

            console.log(checkUser);

            return createToken(data.id, oAuth2Client.credentials.access_token);
        } catch (error) {
            console.error(error.response.data);
            return error.response.status;
        }
    },
};

module.exports = googleLogin;
