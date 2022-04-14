import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: { id },
      });
      console.log(coffeeShop);
      if (!coffeeShop) {
        return {
          ok: false,
          error: "No coffee shop found",
        };
      }

      await client.coffeeShop.delete({
        where: { id },
      });

      return {
        ok: true,
        error: null,
      };
    }),
  },
};
