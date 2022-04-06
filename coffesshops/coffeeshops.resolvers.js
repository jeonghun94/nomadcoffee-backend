import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId: id }) => client.user.findUnique({ where: { id } }),
  },

  Category: {
    totalShops: () => client.Category.count(),
    shops: async ({ name }, { page }, { loggedInUser }) => {
      console.log(name);
      console.log(page);

      if (!page) {
        return client.CoffeeShop.findMany({
          where: {
            userId: loggedInUser.id,
            categories: {
              some: {
                name,
              },
            },
          },
        });
      } else {
        return client.CoffeeShop.findMany({
          take: 1,
          skip: (page - 1) * 1,
          where: {
            userId: loggedInUser.id,
            categories: {
              some: {
                name,
              },
            },
          },
        });
      }
    },
  },
};
