const express = require("express");
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const moduleAlias = require('module-alias')

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//alias 설정
moduleAlias.addAliases({
    '@root': __dirname,
    '@mybatis': __dirname + '/models/mybatis',
    '@config': __dirname + '/config',
});

const port = process.env.PORT || 4000;

/** 라우팅 모듈 선언 */
const mainRouter = require('./routes/main/main');

app.use('/api/list', mainRouter);

app.listen(port, () => {
    console.log(`Server Running on PORT : ${port}`);
});
