import client from "../../client";
import jwt from "jsonwebtoken";

export default {
  Query: {
    seeProfile: (_, { token }) => {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      return client.user.findUnique({
        where: {
          id,
        },
        include: {
          following: true,
          followers: true,
        },
      });
    },
  },
};
