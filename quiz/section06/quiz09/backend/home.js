import express from "express";
import cors from "cors";
//import "dotenv/config";
import mongoose from "mongoose";
import {checkPhone, getToken, sendTokenToSMS} from "./phone.js";
import Token from "./models/token.model.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/tokens/phone", async (req, res) => {
    const myphone = req.body.phone;

    if (!checkPhone(myphone)) {
        return res.status(400).send("잘못된 번호 형식입니다.");
    }

    const mytoken = getToken();
    try {
        await sendTokenToSMS(myphone, mytoken);

        await Token.findOneAndUpdate(
            {phone: myphone},
            {token: mytoken, isAuth: false},
            {upsert: true, new: true}
        );
        console.log(Token);

        res.send(`${myphone}으로 인증 문자가 전송되었습니다.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("문자 전송 중 에러가 발생했습니다.");
    }
});

app.patch("/tokens/phones", async (req, res) => {
    const {phone, token} = req.body;

    try {
        const foundToken = await Token.findOne({phone});

        if (!foundToken) {
            return res.status(404).send(false);
        }

        if (foundToken.token !== token) {
            return res.status(401).send(false);
        }

        foundToken.isAuth = true;
        await foundToken.save();

        res.send(true);
    } catch (error) {
        res.status(500).send("서버 오류 발생");
    }
});


mongoose
    .connect("mongodb://db:27017/userinfo")
    .then(() => console.log("db 접속에 성공하였습니다."))
    .catch(() => console.log("db 접속에 실패하였습니다."));

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
