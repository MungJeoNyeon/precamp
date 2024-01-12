/*
    2. 가입 환영 템플릿 만들기
    1. 회원가입을 축하하는 형태의 템플릿을 출력하는 함수를 만들어 주세요.
    1. **이메일**, **주민번호**, **휴대폰 번호**, **내가 좋아하는 사이트**를 함수의 입력으로 받고, 
    해당 내용이 html 태그가 포함된 텍스트로 콘솔에 출력되어야 합니다.
*/

// function qqq(templateSite) {
//   console.log(templateSite);
// }

// const templateSite = `
//         <html>
//             <body>
//                 <h1>${email}님 가입을 환영합니다.</h1>
//                 <hr />
//                 <div>이메일: ${email}</div>
//                 <div>주민번호: ${registrationNumber}</div>
//                 <div>휴대폰 번호: ${phoneNumber}</div>
//                 <div>내가 좋아하는 사이트: ${likedSite}</div>
//             </body>
//         </html>
//     `;

// qqq(templateSite);

function getTemplate({ email, registrationNumber, phoneNumber, likedSite }) {
  const mytemplate = `
        <html>
            <body>
                <h1>${email}님 가입을 환영합니다.</h1>
                <hr />
                <div>이메일: ${email}</div>
                <div>주민번호: ${registrationNumber}</div>
                <div>휴대폰 번호: ${phoneNumber}</div>
                <div>내가 좋아하는 사이트: ${likedSite}</div>
            </body>
        </html>
    `;
  console.log(mytemplate);
  return mytemplate;
}

function sendUser({ email, registrationNumber, phoneNumber, likedSite }) {
  const mytemplate = getTemplate({
    email,
    registrationNumber,
    phoneNumber,
    likedSite,
  });
}

const email = "aaa@aaa.com";
const registrationNumber = "123456-1234567";
const phoneNumber = "01022223333";
const likedSite = "apple.com";
sendUser({ email, registrationNumber, phoneNumber, likedSite });
