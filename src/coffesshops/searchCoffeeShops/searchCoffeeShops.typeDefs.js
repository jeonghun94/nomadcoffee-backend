import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchCoffeeShops(keyword: String!): [CoffeeShop]
  }
`;
