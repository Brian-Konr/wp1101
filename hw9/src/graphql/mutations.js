import { gql } from '@apollo/client';

export const FIND_OR_CREATE_USER_MUTATION = gql`
  mutation FindOrCreateUser($userName: String!) {
    findOrCreateUser(user: $userName) {
      name
      message {
        sendBy
        sendTo
        body
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage(
    $sendBy: String!
    $sendTo: String!
    $body: String!
  ) {
    createMessage(
      data: {
        sendBy: $sendBy
        sendTo: $sendTo
        body: $body
      }
    ) {
      sendBy
      sendTo
      body
    }
  }
`;

export const CLEAN_USER_MESSAGE_MUTATION = gql`
  mutation CleanUserMessageMutation($userName: String!) {
    clearMessage(user: $userName) {
      sendBy
      sendTo
      body
    }
  }
`;