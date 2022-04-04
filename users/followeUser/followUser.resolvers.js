import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: {
          username,
        },
      });
      console.log(username);
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }

      console.log(ok);

      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
