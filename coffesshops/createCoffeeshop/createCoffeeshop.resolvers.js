import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeshop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photoUrls, categories },
        { loggedInUser: { id } }
      ) => {
        const user = await client.user.findUnique({ where: { id } });
        if (!user) {
          return {
            ok: false,
            error: "No user found",
          };
        }

        // console.log(name, latitude, longitude, photoUrls, categories);

        const shop = await client.CoffeeShop.findUnique({
          where: {
            name_latitude_longitude: {
              name,
              latitude,
              longitude,
            },
          },
        });

        if (shop !== null) {
          return {
            ok: false,
            error: "Coffeeshop aleady exists",
          };
        }

        const urlObj = photoUrls.map((url) => ({
          url,
        }));
        const categoriesObj = categories.map((name) => ({
          where: {
            name,
          },
          create: { name },
        }));

        // console.log(urlObj);
        console.log(categoriesObj);

        await client.CoffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id,
              },
            },
            photos: {
              create: urlObj,
            },
            categories: {
              connectOrCreate: categoriesObj,
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
