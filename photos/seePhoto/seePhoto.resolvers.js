import client from "../../client";

export default {
  Query: {
    seePhoto: async (_, { id }) => {
      return await client.photo.findUnique({ where: { id } });
    },
  },
};
