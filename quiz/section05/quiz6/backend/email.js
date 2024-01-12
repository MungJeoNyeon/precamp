import { getToday } from "./util.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, fullPhone, prefer }) {
  const mytemplate = `
      <html>
          <body>
              <h1>${name}님 가입을 환영합니다!!!</h1>
              <hr />
              <div>이름: ${name}</div>
              <div>전화번호: ${fullPhone}</div>
              <div>좋아하는 사이트: ${prefer}</div>
              <div>가입일: ${getToday()}</div>
          </body>
      </html>
  `;
  return mytemplate;
}

export async function sendTemplateToEmail(email, mytemplate) {
  try {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: email,
      subject: `가입을 환영합니다^^`,
      html: mytemplate,
    });

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // 오류를 다시 던져 상위 호출자에게 알립니다.
  }
}
