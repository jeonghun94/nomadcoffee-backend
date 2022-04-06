import { gql } from "apollo-server-express";

export default gql`
  type CreateCoffeeshopResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createCoffeeshop(
      name: String!
      latitude: String!
      longitude: String!
      photoUrls: [String]!
      categories: [String]!
    ): CreateCoffeeshopResult!
  }
`;
