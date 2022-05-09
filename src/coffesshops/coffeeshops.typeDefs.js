import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: Upload
    shop: CoffeeShop
  }

  type CoffeeShop {
    id: Int
    name: String
    latitude: String
    longitude: String
    user: User
    photos: String
    categories: [Category]!
  }

  type Category {
    id: Int
    name: String
    slug: String
    shops(page: Int): [CoffeeShop]
    totalShops: Int
  }
`;
