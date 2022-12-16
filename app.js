// npm 에서 받은 자료들 먼저 선언함으로써 연결하기
const expressLayout = require("express-ejs-layouts");
const express = require("express");
const routers = require("./routes/route");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 사용할거다
app.use(expressLayout);
app.use(cookieParser());

// body 를 parse 하려면 이 두줄이 필요함
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// 메인부터 사용하겠다
app.use("/", routers);
app.use(express.static(path.join(__dirname, "public")));

// app의 형태로 모듈화시켜서 내보낸다
module.exports = app;
