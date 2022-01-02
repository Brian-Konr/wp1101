import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query UsersQuery{
    users {
      name
      message {
        sendBy
        sendTo
        body
      }
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query MessagesQuery($userName: String!) {
    messages(user: $userName) {
      sendBy
      sendTo
      body
    }
  }
`;