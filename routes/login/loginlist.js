const googleLogin = require("@root/js/login/googleLogin");
const naverLogin = require("@root/js/login/naverLogin");
const kakaoLogin = require("@root/js/login/kakaoLogin");

const jwt = "jwt";

const setMaxAge = 30 * 24 * 60 * 60 * 1000;

const loginlist = {
    google: async function (req, res) {
        const { code } = req.body;

        const google_oauth2_result = await googleLogin.google_oAuth2_code(code);

        if (google_oauth2_result === 400) {
            res.sendStatus(google_oauth2_result);
        } else {
            res.cookie(jwt, google_oauth2_result, {
                maxAge: setMaxAge,
                httpOnly: true,
            });

            res.send(google_oauth2_result);
        }
    },
    naver: async function (req, res) {
        const { code, state } = req.body;

        const naver_oauth2_result = await naverLogin.naver_oauth2_code(
            code,
            state
        );

        if (naver_oauth2_result === 401) {
            res.sendStatus(naver_oauth2_result);
        } else {
            res.cookie(jwt, naver_oauth2_result, {
                maxAge: setMaxAge,
                httpOnly: true,
            });

            res.send(naver_oauth2_result);
        }
    },
    kakao: async function (req, res) {
        const { code, state } = req.body;

        const kakao_oauth_result = await kakaoLogin.kakao_oAuth_code(
            code,
            state
        );

        if (kakao_oauth_result === 400) {
            res.sendStatus(kakao_oauth_result);
        } else {
            res.cookie(jwt, kakao_oauth_result, {
                maxAge: setMaxAge,
                httpOnly: true,
            });
            res.send(kakao_oauth_result);
        }
    },
};

module.exports = loginlist;
