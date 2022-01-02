import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    message {
      mutation
      data {
        sendBy
        sendTo
        body
      }
    }
  }
`;

export const CLEAN_SUBSCRIPTION = gql`
  subscription {
    clean {
      mutation
      data {
        sendBy
        sendTo
        body
      }
    }
  }
`;