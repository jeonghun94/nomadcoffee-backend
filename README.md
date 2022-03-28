# 서버 셋업

아폴로 서버랑, GQL 그냥 최신 버전으로 인스톨 하면됨

# 아폴로 서버

모듈 임포트 -> typeDef, resolver 생성 -> new ApolloServer -> server.listen 순

# 바벨

우선 총 설치 파일은 3가지 @babel/node, core, preset-env이며 babel.config.json 파일 설치 해주고 아래 코드 작성

<pre>
    <code>
        {
         "presets": ["@babel/preset-env"]
        }
    </code>
</pre>

nodemon과 같이 사용 할 경우 아래 코드 처럼 변경

<pre>
    <code>
        {
         "dev": "nodemon --exec babel-node server"
        }
    </code>
</pre>
