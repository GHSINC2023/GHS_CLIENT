import { gql } from "@apollo/client";


export const logoutLog = gql`mutation Mutation($userId: ID!) {
    createLogs(userID: $userId) {
      logsID
      modifiedBy
      createdAt
      title
    }
  }`