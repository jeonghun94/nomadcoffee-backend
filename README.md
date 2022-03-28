# 서버 셋업

아폴로 서버랑, GQL 그냥 최신 버전으로 인스톨 하면됨

# 아폴로 서버

모듈 임포트 -> typeDef, resolver 생성 -> new ApolloServer -> server.listen 순

# 바벨

우선 총 설치 파일은 3가지 @babel/node, core, preset-env이며 babel.config.json 파일 설치 해주고 아래 코드 작성

<code>  
    {
        "presets": ["@babel/preset-env"]
    }   
</code>

nodemon과 같이 사용 할 경우 아래 코드 처럼 변경

<code>
    {
        "dev": "nodemon --exec babel-node server"
    }
</code>

Prisma는 처음 모든 설정이 required임 하지만 gql은 반대임 모든걸 설정해줘야함
