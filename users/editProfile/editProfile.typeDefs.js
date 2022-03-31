import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      location: String
      password: String
      avatarURL: String
      githubUserName: String
    ): EditProfileResult!
  }
`;
