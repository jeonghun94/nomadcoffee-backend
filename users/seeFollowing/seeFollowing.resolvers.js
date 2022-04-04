import client from "../../client";

export default {
  Query: {
    // 해당 username의 팔로워 목록을 보여준다.
    seeFollowing: async (_, { username, lastId }) => {
      // 모든 유저 항목을 가져오는건 비효율 적이므로, 해당 유저 ID만 가져온다.
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      // 유저가 존재하지 않는다면 에러를 반환한다.
      if (!ok) {
        return {
          ok: false,
          error: "user not found",
        };
      }

      // 해당 유저의 팔로워 목록을 가져온다.
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          // cursor pagination 보여줄 데이터가 많거나 무한스크롤 용도로 맞음
          // 마지막 id 기준으로 다음 데이터를 가져옴 (cursor)
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};
