const express = require("express");
const router = express.Router();

const mainList = require("./mainList"); //행사 리스트

router.get("/guname", function (req, res) {
    mainList.guname(req, res);
});

router.get("/listlength", function (req, res) {
    mainList.length(req, res);
});

router.get("/resultlist", function (req, res) {
    mainList.resultList(req, res);
});

router.get("/detail", function (req, res) {
    mainList.item(req, res);
});

module.exports = router;
