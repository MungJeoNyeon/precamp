export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("잘못된 번호입니다.");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export function sendTokenToSMS(myPhone, result) {
  console.log(myPhone + "번호로 인증번호 " + result + "를 전송합니다.");
}
