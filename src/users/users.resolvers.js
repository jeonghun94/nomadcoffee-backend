import client from "../client";

export default {
  User: {
    // 나를 follow하고 있는 사람들
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    // 내가 follow하고 있는 사람들
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    // 나 인지 아닌지 확인
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return Boolean(id === loggedInUser.id);
    },
    // 이 사람을 follow 하고 있는지 확인
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
