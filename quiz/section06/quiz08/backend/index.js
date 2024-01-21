import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import "dotenv/config";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import { options } from "./swagger/config.js";
import { coffeeOptions } from "./swagger/config-coffee.js";
import mongoose from 'mongoose' // 추가

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

// Swagger 문서 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use("/api-docs/coffee", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(coffeeOptions)));

// API 라우트
app.get("/starbucks", function (req, res) {
    // 간단한 데이터 리스폰스 예시
    const drinks = [
        { name: "아메리카노", kcal: "5" },
        // 기타 음료 데이터...
    ];

    res.send(drinks);
});

app.get("/users", function (req, res) {
    // 유저 데이터 리스폰스 예시
    const users = [
        { email: "aaa@gmail.com", name: "철수", phone: "010-1234-5678", personal: "220110-2222222", prefer: "https://naver.com" },
        // 기타 유저 데이터...
    ];

    res.send(users);
});

app.post("/tokens/phone", (req, res) => {
    const myphone = req.body.qqq;

    if (!checkPhone(myphone)) {
        res.status(400).send("잘못된 전화번호 형식입니다.");
        return;
    }

    const mytoken = getToken();
    sendTokenToSMS(myphone, mytoken);

    res.send("인증완료!!!");
});

app.post("/signup/email", async (req, res) => {
    try {
        const { name, personal1, fullPhone, prefer, email, password } = req.body;

        if (!checkEmail(email)) {
            res.status(400).send("잘못된 이메일 형식입니다.");
            return;
        }

        const welcomeTemplate = getWelcomeTemplate({ name, fullPhone, prefer });
        await sendTemplateToEmail(email, welcomeTemplate);

        res.send("가입완료!!!");
    } catch (error) {
        console.error("Error handling signup:", error);
        res.status(500).send("서버에서 오류가 발생했습니다.");
    }
});

// 몽고DB 접속!! // 추가
mongoose.connect("mongodb://my-database:27017/mydocker")
  .then(() => console.log("db 접속에 성공하였습니다."))
  .catch(() => console.log("db 접속에 실패하였습니다."))

// 서버 시작
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
