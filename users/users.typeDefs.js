import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    userName: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String
    githubUserName: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(userName: String!): User
    user(id: Int!): User
  }

  type Mutation {
    createAccount(
      userName: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String
      githubUserName: String
    ): User

    deleteAccount(id: Int!): User
  }
`;
