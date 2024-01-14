// board.model.js

import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String
})

export const Board = mongoose.model("Board", boardSchema)

// `mongoose` 라이브러리를 사용하기 위해서 먼저 불러와 줍니다.

// 새로운 스키마를 `BoardSchema` 변수에 담아서 선언하고 내부에는 다음과 같이 요소들의 key 값의 타입을 지정해 주었습니다.

// `model() 메소드`를 사용하여 문자열과 schema를 전달하여 model을 생성합니다. **첫번째 인자는 해당 collection의 단수적 표현을 나타내는 문자열 입니다.**

// 생성된 `model` 을 외부에서 접근할수 있도록 `export` 해주었습니다.