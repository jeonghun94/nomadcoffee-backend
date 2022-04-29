import client from "../../client";

export default {
  Query: {
    searchCoffeeShops: async (_, { keyword }) => {
      let coffeeShops;
      coffeeShops = await client.coffeeShop.findMany({
        where: {
          name: keyword,
        },
        include: {
          photos: true,
        },
      });

      if (coffeeShops.length === 0) {
        coffeeShops = await client.coffeeShop.findMany({
          where: {
            categories: {
              some: {
                name: keyword,
              },
            },
          },
          include: {
            photos: true,
          },
        });
      }
      console.log(coffeeShops);

      return coffeeShops;
    },
  },
};
