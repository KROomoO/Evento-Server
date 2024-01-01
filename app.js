const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const moduleAlias = require("module-alias");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//alias 설정
moduleAlias.addAliases({
    "@root": __dirname,
    "@mybatis": __dirname + "/models/mybatis",
    "@config": __dirname + "/config",
});

const port = process.env.PORT || 4000;

/** 라우팅 모듈 선언 */
const mainRouter = require("./routes/main/main");
const detailRouter = require("./routes/detail/detail");
const loginRouter = require("./routes/login/login");
const myPageRouter = require("./routes/myPage/myPage");

app.use("/api", mainRouter);
app.use("/api/detail", detailRouter);
app.use("/api/login", loginRouter);
app.use("/api/mypage", myPageRouter);

app.listen(port, () => {
    console.log(`Server Running on PORT : ${port}!`);
});
