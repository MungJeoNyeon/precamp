# 컴퓨터 만드는 설명서

# 1. 운영체제 설치(node 14버전과 npm과 yarn이 모두 설치되어있는 리눅스)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /home.js

# 3. 도커안에서 home.js 실행시키기
CMD node home.js

# `FROM 리눅스:최신버전` 이런식으로 쓰면, 리눅스의 최신 버전이 깔린 컴퓨터가 한대 만들어집니다. 

# 그런데 우리는 컴퓨터에 node, npm, yarn도 설치해야합니다. 도커에는 다른 사람들이 만들어놓은 여러 이미지가 있는데 우리가 필요한 것들이 이미 설치되어 있는 이미지도 있습니다.

# `FROM node:14` 을 하면 node, npm, yarn이 모두 설치된 리눅스 컴퓨터가 하나 생기게 됩니다.

# `COPY ./home.js /home.js` 를 하면 `home.js` 파일에 있는 모든 소스 코드를 가상 컴퓨터 안의 `home.js` 파일로 복사하여 저장합니다.

# 우리가 만든 가상 컴퓨터내에는 `home.js` 파일이 존재합니다.

# `CMD node home.js` 명령어를 통해서 복사하여 저장된 파일을 실행해 줍니다.

# docker build .
# docker images
# docker run [이미지 id]
# docker ps -a
# docker rm [컨테이너 id]