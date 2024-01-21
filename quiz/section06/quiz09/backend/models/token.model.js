import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

// 토큰 모델에는 핸드폰 번호, 토큰, isAuth(true 또는 false)가 들어가야합니다.

export function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("잘못된 번호입니다.");
    return false;
  } else {
    return true;
  }
}

// 5. 해당 핸드폰 번호가 이미 `Tokens` 문서에 저장되어 있다면 최신 토큰으로 덮어씁니다. 
// 6. 요청을 여러번해도 추가되는것이 아니라 기존 것을 업데이트하기 때문에, DB에는 `한 핸드폰 번호당 하나의 데이터`만 저장되어있습니다.
export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export async function sendTokenToSMS(myphone, token) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `[Web발신] 안녕하세요!! 인증번호는 [${token}] 입니다!!`,
  });
  console.log(result);
}
