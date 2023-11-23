const express = require("express");
const router = express.Router();

const myPageList = require("./myPageList");

router.post("/myscrap", function (req, res) {
    myPageList.myScrap(req, res);
});

module.exports = router;
