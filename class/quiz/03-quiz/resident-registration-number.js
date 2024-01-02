/* 1. 주민번호 뒷자리를 가리는 함수(customRegistrationNumber)를 하나 만들고, 
        해당 함수에 “210510-1010101” 와 같이 주민번호를 넣어서 실행하면 
        “210510-1******” 와 같은 형태로 콘솔에 출력되도록 만들어 주세요.
    1. 주민번호 가운데가 ”-”로 구성되어야 합니다. 
        - 그렇지 않을 경우 에러 메시지를 콘솔에 출력해 주세요.
            
            ex) ”에러 발생!!! 형식이 올바르지 않습니다!!!”
            
    2. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
        - 그렇지 않을 경우 에러 메시지를 콘솔에 출력해 주세요.
            
            ex) ”에러 발생!!! 개수를 제대로 입력해 주세요!!!”
            
    3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력해 주세요.
    4. 함수는 퍼사드 패턴이 적용되어야 합니다. 
        - 필요시 새로운 파일도 생성 가능합니다. - 파일명 자유
    5. 함수에 “210510-1010101”, “210510-1010101010101”, “2105101010101”를 
        각각 넣어 실행했을 때 아래의 출력 결과 예시와 동일하게 나타나면 됩니다. */

/* 나의 생각
1. 주민번호 앞자리, 뒷자리를 나눈다. => 먼저 형식이 올바른지 체크.
2. 주민번호의 앞뒤 자리 length를 검사한다. => "-" 를 기준으로 앞 뒤를 나눈다.
    f.length < 6 || f.length > 6  
    b.length < 7 || b.length > 7
3. 
*/

// 형식이 올바른가?
// 1. "-" 가 들어갔는지 체크
function validateFormat(number) {
  return number.includes("-");
}

// 2. length 적절한 지 체크
function validateLength(number) {
  const parts = number.split("-"); // "-" 를 기준으로 잘라서 배열에 담는다

  // 앞 뒤 length가 적절한 지 체크
  return parts[0].length === 6 && parts[1].length === 7;
}

// 3. mask number => *
function maskNumber(number) {
  return number.substring(0, 8) + "******";
  // mask 할 부분을 제외하고 추출 후, "*" 추가
}

function customRegistrationNumber(registrationNumber){
    if (!validateFormat(registrationNumber)) {
        console.error("에러 발생!!! 형식이 올바르지 않습니다!!!");
        return;
    } else if(!validateLength(registrationNumber)){
        console.error("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
        return;
    } else {
        console.log("올바른 형식입니다!!!")
        console.log(maskNumber(registrationNumber));
        return true;
    }
}

// 테스트 실행
customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");