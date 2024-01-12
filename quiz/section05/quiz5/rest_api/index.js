import express from 'express'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', (req, res) => {
  
  const result = [
    { number: 1, writer: "철수", title: "제목입니다", contents: "내용입니다" },
    { number: 2, writer: "영희", title: "좋은 날씨입니다", contents: "내용입니다" },
  ]

  res.send(result)
})

app.post('/tokens/phone', (req, res) => {
  const myphone = req.body.myphone

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone)
  if(isValid){
    // 2. 휴대폰 번호 자릿수가 맞다면 핸드폰 토큰 4자리 만들기
    const mytoken = getToken()

    // 3. 만든 토큰을 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken)
    res.send("인증완료!!!")
  }
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})


/*
1. Rest-API로 만들어진 createTokenOfPhone API(인증번호 전송 API)를 GraphQL API로 변경해 주세요.
    
    ( Rest-API에 관한 소스 코드는 rest_api 폴더 내에 있습니다.)
    
    1. createTokenOfPhone API 요청에 대한 데이터 타입을 지정해 주세요.
    2. 임의의 휴대폰 번호로 createTokenOfPhone API를 요청하면 랜덤한 4자리 숫자의 인증번호를 받을 수 있도록 `index.js` 파일에 `createTokenOfPhone` 함수를 완성해 주세요.
    3. Apollo 서버를 실행시켜, GraphQL API를 요청해 “인증 완료” 응답을 받아 주세요.
    4. VS code Terminal 창에 나타나는 console 을 확인하고 캡처해 주세요.
*/

