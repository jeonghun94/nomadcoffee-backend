import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";

const resolverFn = async (
  _,
  { name, location, password: newPassword, avatarURL, githubUserName },
  { loggedInUser }
) => {
  let newAvatarUrl = null;
  if (avatarURL) {
    const { filename, createReadStream } = await avatarURL;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    console.log("dsd");
    readStream.pipe(writeStream);
    console.log("sdsdddd");
    newAvatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      name,
      location,
      ...(uglyPassword && { password: uglyPassword }),
      ...(newAvatarUrl && { avatarURL: newAvatarUrl }),
      githubUserName,
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
