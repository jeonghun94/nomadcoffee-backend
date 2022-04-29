import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 2,
        skip: page,
        include: {
          categories: true,
          photos: true,
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
          photos: true,
        },
      });
    },
  },
};
