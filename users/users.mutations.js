import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
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
        console.log("User already exists");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
          },
        });
        console.log("User created");
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
