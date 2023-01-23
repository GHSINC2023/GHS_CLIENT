import { gql } from '@apollo/client'



export const userPass = gql`mutation UpdateUserPassword($password: String!, $retype: String!, $userId: ID!) {
    updateUserPassword(password: $password, retype: $retype, userID: $userId) {
      updatedAt
    }
  }`



export const updateUserProfile = gql`mutation UpdateAllContentUserProfile($userId: ID!, $profile: ProfileInput, $address: AddressInput) {
  updateAllContentUserProfile(userID: $userId, profile: $profile, Address: $address) {
    createdAt
    email
    role
  }
}`