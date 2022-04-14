import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
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

      console.log(id);

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
