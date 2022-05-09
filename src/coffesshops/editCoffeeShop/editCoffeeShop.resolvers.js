import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, photoUrls, categories },
        { loggedInUser }
      ) => {
        console.log(id, name, latitude, longitude, photoUrls, categories);
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });

        console.log(coffeeShop);
        // 커피샵을 못찾았을 때
        if (!coffeeShop) {
          return {
            ok: false,
            error: "CoffeeShop not found",
          };
        }
        // 유저 아이디가 일치하지 않을 때
        if (coffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "You do not have permission to edit this coffee shop",
          };
        }

        const urlObj = photoUrls?.map((url) => ({
          url,
        }));

        const categoriesObj = categories?.map((name) => ({
          where: {
            name,
          },
          create: { name },
        }));
        // coffee shop 업데이트 처리
        const d = await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            // ...(photoUrls && {
            //   photos: {
            //     delete: coffeeShop.photos,
            //     create: urlObj,
            //   },
            // }),

            ...(categories && {
              categories: {
                disconnect: coffeeShop.categories,
                connectOrCreate: categoriesObj,
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
