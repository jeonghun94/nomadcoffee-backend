import { gql } from "apollo-server-express";

// 해시태그는 캡션에서 정규식 사용하여 가져올것
export default gql`
  type Mutation {
    uploadPhoto(file: String, caption: String): Photo
  }
`;
