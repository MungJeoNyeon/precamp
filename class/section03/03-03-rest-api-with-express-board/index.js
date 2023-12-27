// const express = require("express");  // 옛날 방식 => commonjs
import express from "express"; // module
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

const app = express();
app.use(express.json());

app.get("/boards", function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    { number: 1, writer: "사람1", title: "제목1", contents: "내용1" },
    { number: 2, writer: "사람2", title: "제목2", contents: "내용2" },
    { number: 3, writer: "사람3", title: "제목3", contents: "내용3" },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body);

  // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", function (req, res) {
  const myPhone = req.body.phoneNumber;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;

  // 2. 휴대폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);

  res.send("인증 완료");
});

app.listen(3000);
