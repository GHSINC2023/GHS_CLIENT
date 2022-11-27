import { gql } from '@apollo/client'


export const userLogs = gql`query GetUserLogs($userId: ID!, $limit: Int!, $offset: Int!) {
    getUserLogs(userID: $userId, limit: $limit, offset: $offset) {
      createdAt
      logsID
      modifiedBy
      title
      updatedAt
    }
  }`