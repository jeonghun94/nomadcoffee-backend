import { gql } from "apollo-server-core";

export default gql`
  type deleteCoffeeShopResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deleteCoffeeShop(id: Int!): deleteCoffeeShopResult!
  }
`;
