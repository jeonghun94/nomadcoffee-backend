import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 1,
        skip: (page - 1) * 1,
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
      });
    },
  },
};
