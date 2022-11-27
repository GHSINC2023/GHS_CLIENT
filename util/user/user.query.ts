import { gql } from "@apollo/client";

export const getUserByProfileID = gql`query Query($userId: ID!) {
    getUserByID(userID: $userId) {
      userID
      email
      role
      createdAt
      updatedAt
      profile {
        firstname
        lastname
        phone
        birthday
        profileAddress {
          addressID
          city
          province
          zipcode
          street
        }
      }
    }
  }`