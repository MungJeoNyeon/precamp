import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { coffeeOptions } from "./swagger/config-coffee.js";

const app = express();
app.use(express.json());
app.use("/api-docs/coffee", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(coffeeOptions)));

// 1. api method get방식 조회
// 2. api endpoint /users
app.get("/starbucks", function (req, res) {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  // 4. 각각의 회원 데이터는 email, name, phone, personal, prefer 가 반드시 포함. key 값을 반드시 동일하게
  const result = [
    { name: "아메리카노", kcal: "5" },
    { name: "카페라떼", kcal: "10" },
    { name: "콜드브루", kcal: "15" },
    { name: "카페모카", kcal: "50" },
    { name: "돌체라떼", kcal: "500" },
    { name: "카라멜라떼", kcal: "200" },
    { name: "바닐라라떼", kcal: "20" },
    { name: "에스프레소", kcal: "1" },
    { name: "디카페인", kcal: "5" },
    { name: "오트라떼", kcal: "300" },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

// 3. postman에서 해당 api를 요청했을 때, 하드코딩된 회원 5명의 데이터를 받아와야한다.
// => 회원 1명의 데이터는 객체 1개이며, 총 5개의 객체를 하나의 배열로 담아 받습니다.

app.listen(3000);
