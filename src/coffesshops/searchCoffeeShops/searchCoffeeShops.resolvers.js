import client from "../../client";

export default {
  Query: {
    searchCoffeeShops: async (_, { keyword }) => {
      console.log(keyword);

      let coffeeShops;
      coffeeShops = await client.coffeeShop.findMany({
        where: {
          name: keyword,
        },
      });

      console.log(coffeeShops);

      if (coffeeShops.length === 0) {
        coffeeShops = await client.coffeeShop.findMany({
          where: {
            categories: {
              some: {
                name: keyword,
              },
            },
          },
        });
      }
      console.log(coffeeShops);

      return coffeeShops;
    },
  },
};
