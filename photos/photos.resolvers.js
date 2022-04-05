import client from "../client";

export default {
  Photo: {
    // 사진을 조회할때 유저 컴퓰리트 컬럼을 조회
    user: ({ userId: id }) => {
      return client.user.findUnique({ where: { id } });
    },
    // arg 확인 첫번째 자신 parent , 두번째 전달값, 세번째 헤더 정보ㄴ
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
