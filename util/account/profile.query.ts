import { gql } from "@apollo/client";


export const getUserProfile = gql`query GetUserByID($userId: ID!) {
    getUserByID(userID: $userId) {
        userID
      email
      role
      profile {
        profileID
        firstname
        lastname
        phone
        birthday
        profileAddress {
            addressID
          province
          street
          zipcode
          city
        }
      }
    }
  }`


export const getUserLog = gql`query GetUserLogs($userId: ID!, $limit: Int!, $offset: Int!) {
  getUserLogs(userID: $userId, limit: $limit, offset: $offset) {
    logsID
    modifiedBy
    title
    createdAt
  }
}`