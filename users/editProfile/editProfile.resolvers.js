import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { name, location, password: newPassword, avatarURL, githubUserName }
    ) => {
      console.log(name, location, newPassword, avatarURL, githubUserName);
      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const user = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          name,
          location,
          ...(uglyPassword && { password: uglyPassword }),
          avatarURL,
          githubUserName,
        },
      });
      console.log(user);

      if (user.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Fail update user.",
        };
      }
    },
  },
};
