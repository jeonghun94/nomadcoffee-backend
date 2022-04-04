import client from "../../client";

export default {
  Query: {
    // 해당 username의 팔로워 목록을 보여준다.
    seeFollowers: async (_, { username, page }) => {
      // 모든 유저 항목을 가져오는건 비효율 적이므로, 해당 유저 ID만 가져온다.
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      // 유저가 존재하지 않는다면 에러를 반환한다.
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      // 해당 유저의 팔로워 목록을 가져온다.
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          // offset pagination 데이터가 적거나 게시물을 페이지를 통해 이용할 때 적합
          // 로직 take 보여줄 수, skip 생략 느낌
          take: 5,
          skip: (page - 1) * 5,
        });

      // 해당 유저의 총 팔로워 수를 가져온다. 단순 개수는 count로 가져오면 된다.
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
