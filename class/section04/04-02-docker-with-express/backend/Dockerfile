# 컴퓨터 만드는 설명서

# 1. 운영체제 설치(node 14버전과 npm과 yarn이 모두 설치되어있는 리눅스)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY . /myfolder/
WORKDIR /myfolder/
RUN yarn install

# 3. 도커안에서 home.js 실행시키기
CMD yarn start:dev

# `FROM node:14` node가 설치되어 있는 리눅스 컴퓨터를 한대 만들고,

# `COPY . /myfolder/` 모든 소스 코드를 복사해 도커 컴퓨터에 넣어주고.

# `WORKDIR /myfolder/` 명령어를 실행할 작업 폴더 위치를 정해줍니다.

# `CMD yarn strat:dev` 실행 명령어를 입력하여 서버를 실행해줍니다.