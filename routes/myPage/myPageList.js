const myPageListMapper = require("mybatis-mapper");

myPageListMapper.createMapper(["./models/mybatis/mypage/myPageMapper.xml"]);

let format = { language: "sql", indent: " " };

const mysql = require("@config/mysql/db");

const myPageList = {
    myScrap: function (req, res) {
        const param = req.body;
        const query = myPageListMapper.getStatement(
            "myPageMapper",
            "myScrapListQuery",
            param,
            format
        );
        mysql.query(query, (error, result) => {
            res.send(result);
        });
    },
};

module.exports = myPageList;
