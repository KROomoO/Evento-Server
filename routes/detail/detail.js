const express = require("express");
const router = express.Router();

const detailList = require("./detailList"); //행사 리스트

router.post("/check_scrap", function (req, res) {
    detailList.checkScrap(req, res);
});

router.post("/save_scrap", function (req, res) {
    detailList.saveScrap(req, res);
});

router.post("/delete_scrap", function (req, res) {
    detailList.deleteScrap(req, res);
});

module.exports = router;
