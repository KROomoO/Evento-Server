const express = require("express");
const router = express.Router();

const mainList = require("./mainList"); //행사 리스트

router.get("/guname", function (req, res) {
    console.log("guname");
    mainList.guname(req, res);
});

router.get("/listlength", function (req, res) {
    console.log("listlength");
    mainList.length(req, res);
});

router.get("/resultlist", function (req, res) {
    console.log("resultlist");
    mainList.resultList(req, res);
});

router.get("/detail", function (req, res) {
    mainList.item(req, res);
});

module.exports = router;
