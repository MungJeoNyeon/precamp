// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-example.codebootcamp.co.kr/graphql  에서 제공하는 API를 사용하세요.
// ======================================================================

// 1) 철수의 나이는 몇살인가요?(나이만 조회해 주세요.) 결과 : 12
/* 
query {
  fetchProfile(name:"철수"){
    age
  }
}
*/

// 2) 영희의 학교는 어디인가요?(학교만 조회해 주세요.) 결과 : 회원초등학교
/*
query {
  fetchProfile(name:"영희"){
    school
  }
}
*/

// 3) 3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.) 데이터가 null, 8번으로 조회
/*
query {
  fetchBoard(number:8){
    contents
    createdAt
  }
}
*/

// 4) 본인의 이름으로 프로필을 작성해 보세요. 결과 : number=1284
/*
mutation {
  createProfile(name : "정현", age : 23, school : "다람쥐초등학교"){
    message
    number
  }
}
*/

// 5) 본인의 이름으로 게시글을 작성해 보세요. 결과 : number=20904
/*
mutation {
  createBoard(writer : "정현", title : "제목", contents : "내용"){
    message
    number
  }
}
*/

// 6) 자신의 프로필을 조회해 보세요. 결과 : 1284, "정현", 23, 다람쥐초등학교
/*
query {
  fetchProfile(name:"정현"){
    number
    name
    age
    school
  }
}
*/

// 7) 자신의 게시글을 조회해 보세요. 결과 : number=20904
/*
query {
  fetchBoard(number:20904){
    number
    writer
    title
    contents
    like
    createdAt
  }
}
*/

// 8) 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.
/*
mutation {
  updateProfile(name:"정현", age: 23, school: "용원초등학교"){
    _id
    number
    message
  }
}
*/

// 9) 본인의 게시글에서, 제목과 내용을 바꿔보세요.
/*
mutation {
  updateBoard(title: "제목 수정", contents:"내용 수정"){
    _id
    number
    message
  }
}
*/

// 10) 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.
/*
mutation {
  createProfile(name:"만화주인공", age:22, school:"00초등학교"){
    _id
    number
    message
  }
}
*/

// 11) 위 10번에서 작성한 프로필을 삭제해 보세요.
/*
mutation {
  deleteProfile(name:"만화주인공"){
    _id
    number
    message
  }
}
*/

// 12) 상품을 하나 만들어 보세요.
/*

*/

// 13) 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.

// 14) 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.

// 15) 조회했던 상품을 삭제해 보세요.

// 16) 삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.

// 17) 게시물 목록 중, 2페이지를 조회해 보세요.

// 18) 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하는지 확인해 보세요.
// 		(Hint : syntax error는 아닙니다.)

// 19) 프로필이 전체 몇 개가 있는지 확인해 보세요.

// 20) 게시물은 몇 개가 있는지 조회해보세요.
