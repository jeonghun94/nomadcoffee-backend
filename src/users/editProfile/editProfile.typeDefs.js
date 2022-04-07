import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      location: String
      password: String
      avatarURL: Upload
      githubUserName: String
    ): EditProfileResult!
  }
`;
