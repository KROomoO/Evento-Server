const loginMapper = require("mybatis-mapper");

loginMapper.createMapper(["./models/mybatis/login/loginMapper.xml"]);

let format = { language: "sql", indent: " " };

const mysql = require("@config/mysql/db");

const checkUser = async (userInfo) => {
    const checkQuery = loginMapper.getStatement(
        "loginMapper",
        "checkUserQuery",
        userInfo,
        format
    );

    const saveQuery = loginMapper.getStatement(
        "loginMapper",
        "saveUserQuery",
        userInfo,
        format
    );

    const checkUser = await new Promise((resolve, reject) => {
        mysql.query(checkQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].userCount);
            }
        });
    });

    if (checkUser <= 0) {
        const saveUser = await new Promise((resolve, reject) => {
            mysql.query(saveQuery, (error, result) => {
                if (error) {
                    reject("사용자 저장 실패");
                } else {
                    resolve("사용자 저장 완료");
                }
            });
        });

        return saveUser;
    }
};

module.exports = checkUser;
