import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String
    githubUserName: String
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
    isMe: Boolean!
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
  }
`;
