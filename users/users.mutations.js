import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { userName, email, name, location, password, avatarURL, githubUserName }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            userName,
            email,
            name,
            location,
            password: hashedPassword,
            avatarURL,
            githubUserName,
          },
        });
      } catch (e) {
        return e;
      }
    },

    deleteAccount: async (_, { id }) => {
      await client.user.delete({
        where: {
          id,
        },
      });
      console.log(id);
    },
  },
};
