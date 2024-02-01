import { gql } from "@apollo/client";

export const LIST_BOOKS = gql`
  query users {
    users {
      firstName
      id
    }
  }
`;
