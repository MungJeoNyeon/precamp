import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyResult {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미!
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String!): String
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
      const result = [
        { number: 1, writer: "사람1", title: "제목1", contents: "내용1" },
        { number: 2, writer: "사람2", title: "제목2", contents: "내용2" },
        { number: 3, writer: "사람3", title: "제목3", contents: "내용3" },
      ];

      // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정

      // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
      return "게시글 등록에 성공!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  //cors: { origin: ["http://naver.com", "https://daum.net"] }, // 특정 사이트만 지정하고싶을 때
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
