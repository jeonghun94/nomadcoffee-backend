import client from "../../client";

export default {
  Query: {
    searchUsers: (_, { username }) => {
      return client.user.findMany({
        where: {
          username: {
            // 각종 검색 기능을 제공하는 한다.  cotain은 한글자라도 포함시, startWitd는 시작하는 거로 할때
            contains: username.toLowerCase(),
          },
        },
      });
    },
  },
};
