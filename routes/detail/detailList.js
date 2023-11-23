const detailListMapper = require("mybatis-mapper");

detailListMapper.createMapper(["./models/mybatis/detail/detailMapper.xml"]);

let format = { language: "sql", indent: " " };

const mysql = require("@config/mysql/db");

const detailList = {
    checkScrap: async function (req, res) {
        const param = req.body;
        const query = detailListMapper.getStatement(
            "detailMapper",
            "checkScrapQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            if (result[0].checkScrap === 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    },
    saveScrap: function (req, res) {
        const param = req.body;
        const query = detailListMapper.getStatement(
            "detailMapper",
            "saveScrapQuery",
            param,
            format
        );
        try {
            mysql.query(query, (error, result) => {
                res.send("saveScrap is success");
            });
        } catch (error) {
            console.log("saveScrap Error!", error);
        }
    },
    deleteScrap: function (req, res) {
        const param = req.body;
        const query = detailListMapper.getStatement(
            "detailMapper",
            "deleteScrapQuery",
            param,
            format
        );
        try {
            mysql.query(query, (error, result) => {
                res.send("deleteScrap is success");
            });
        } catch (error) {
            console.log("deleteScrap Error!", error);
        }
    },
};

module.exports = detailList;
