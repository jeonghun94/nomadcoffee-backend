import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page }) => {
      return await client.Category.findMany({ take: 1, skip: (page - 1) * 1 });
    },

    seeCategory: async (_, { name }) => {
      return await client.Category.findUnique({
        where: {
          name,
        },
      });
    },
  },
};
