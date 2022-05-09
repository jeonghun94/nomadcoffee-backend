import client from "../../client";
import { uploadPhoto } from "../../shared/shared.utils";
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

        let shopUrl = null;
        console.log(photoUrls);
        if (photoUrls) {
          shopUrl = await uploadPhoto(photoUrls, id);
        }

        console.log(shopUrl);
        // const urlObj = photoUrls.map((url) => ({
        //   url,
        // }));

        const categoriesObj = categories.map((name) => ({
          where: {
            name,
          },
          create: { name },
        }));

        await client.CoffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            photos: shopUrl,
            user: {
              connect: {
                id,
              },
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
