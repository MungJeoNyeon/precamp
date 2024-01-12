import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 1. api method get방식 조회
// 2. api endpoint /users
app.get("/users", function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // 4. 각각의 회원 데이터는 email, name, phone, personal, prefer 가 반드시 포함. key 값을 반드시 동일하게
  const result = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@gmail.com",
      name: "가수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ccc@gmail.com",
      name: "나수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ddd@gmail.com",
      name: "다수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "eee@gmail.com",
      name: "라수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

// 3. postman에서 해당 api를 요청했을 때, 하드코딩된 회원 5명의 데이터를 받아와야한다.
// => 회원 1명의 데이터는 객체 1개이며, 총 5개의 객체를 하나의 배열로 담아 받습니다.

app.listen(3000);
