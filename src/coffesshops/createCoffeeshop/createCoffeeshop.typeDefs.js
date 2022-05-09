import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type CreateCoffeeshopResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createCoffeeshop(
      name: String!
      latitude: String!
      longitude: String!
      photoUrls: Upload
      categories: [String]!
    ): CreateCoffeeshopResult!
  }
`;
