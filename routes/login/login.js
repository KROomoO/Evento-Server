const express = require("express");
const router = express.Router();

const loginlist = require("./loginlist");
const verifyJWTToken = require("./verifyJWTToken");
const logout = require("./logout");

router.get("/verify_jwt", function (req, res) {
    verifyJWTToken(req, res);
});

router.get("/logout", function (req, res) {
    logout(req, res);
});

router.post("/google", function (req, res) {
    loginlist.google(req, res);
});

router.post("/naver", function (req, res) {
    loginlist.naver(req, res);
});

router.post("/kakao", function (req, res) {
    loginlist.kakao(req, res);
});

module.exports = router;
