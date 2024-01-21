// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const phone1 = document.querySelector("#PhoneNumber01").value;
  const phone2 = document.querySelector("#PhoneNumber02").value;
  const phone3 = document.querySelector("#PhoneNumber03").value;
  const fullPhone = phone1 + phone2 + phone3;

  console.log(fullPhone, "로 인증 번호 전송");

  // axios 를 사용하여 서버로 post 요청을 보냄
  try {
    const response = await axios.post("http://localhost:3000/tokens/phone", {
      qqq: fullPhone,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error Phone", error);
  }
};

function submitToken() {
  // 여기에 인증 토큰을 검증하는 로직을 작성하세요.
  console.log("submitToken 함수가 호출되었습니다.");
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const personal1 = document.getElementById("SignupPersonal").value; // 주민등록번호 앞자리
  // 주민등록번호 뒷자리는 보안상의 이유로 서버로 보내지 않음
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const fullPhone = phone1 + phone2 + phone3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const password = document.getElementById("SignupPwd").value;

  console.log("회원 가입 이메일 전송");

  try {
    const response = await axios.post("http://localhost:3000/signup/email", {
      name,
      personal1,
      fullPhone,
      prefer,
      email,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error Axios", error.message);
    // 네트워크 에러의 경우 error.response는 undefined일 수 있음
  }
};
