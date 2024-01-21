// express mongodb
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { checkPhone, getToken, sendTokenToSMS } from "./models/token.model.js";

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

app.post("/tokens/phone"),
  (req, res) => {
    // 1. 핸드폰 번호 받아오기 // postman에서 myphone 입력
    const myphone = req.body.qqq;

    // 2. 핸드폰 번호 체크 => token.model.js
    if (!checkPhone(myphone)) {
      res.status(400).send("잘못된 번호 형식입니다.");
    }

    // 3. 올바르다면 토큰 생성
    const mytoken = getToken();

    // 4. 입력한 번호로 토큰을 전송
    sendTokenToSMS(myphone, mytoken);

    res.send(myphone + "으로 인증 문자가 전송되었습니다.");
  };

// docker 기반의 mongodb 연결
mongoose
  .connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("db 접속에 성공하였습니다."))
  .catch(() => console.log("db 접속에 실패하였습니다."));
// 2. 위 2개의 서버는 docker-compose로 묶어주세요.
// 3. 토큰을 저장하기 위해 mongodb 스키마를 만들어주세요.

// 서버 시작
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

console.log("이 파일은 도커 안에서 실행됩니다.");
