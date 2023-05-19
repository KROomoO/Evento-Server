const express = require("express");
const router = express.Router();

const mainList = require("./mainList"); //행사 리스트

router.get("/", function (req, res) {
    mainList.list(req, res);
});

router.get("/guname", function (req, res) {
    mainList.guname(req, res);
});

module.exports = router;
