const mainListMapper = require("mybatis-mapper");

mainListMapper.createMapper(["./models/mybatis/main/mainListMapper.xml"]);

let format = { language: "sql", indent: " " };

const mysql = require("@config/mysql/db");

const mainList = {
    guname: function (req, res) {
        const param = req.body;
        const query = mainListMapper.getStatement(
            "listMapper",
            "loadGunameQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            res.json(result);
        });
    },
    length: function (req, res) {
        const param = req.query;
        const query = mainListMapper.getStatement(
            "listMapper",
            "loadSelectListLengthQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            res.json(result);
        });
    },
    resultList: function (req, res) {
        const param = req.query;
        const query = mainListMapper.getStatement(
            "listMapper",
            "loadSelectListQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            res.json(result);
        });
    },
    item: function (req, res) {
        const param = req.query;
        const query = mainListMapper.getStatement(
            "listMapper",
            "loadSelectItemQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            res.json(result);
        });
    },
};

module.exports = mainList;
