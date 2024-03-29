import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 3,
        skip: 0,
        include: {
          categories: true,
        },
      });
    },

    seeCoffeeShop: async (_, { id }) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: { id },
      });

      if (!coffeeShop) {
        return {
          name: "coffeeShop not found",
        };
      }

      return await client.coffeeShop.findUnique({
        where: { id },
        include: {
          categories: true,
        },
      });
    },
  },
};
