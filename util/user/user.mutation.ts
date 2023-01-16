import { gql } from '@apollo/client'



export const createUserGHS = gql`mutation Mutation($role: String!, $auth: AuthInput, $profile: ProfileInput, $companyName: String) {
  createAccount(role: $role, auth: $auth, Profile: $profile, companyName: $companyName) {
    userID
    role
    createdAt
    email
  }
}`


export const resetUserPassword = gql`mutation Mutation($userId: ID!) {
  updatePassword(userID: $userId) {
    userID
    email
    role
    createdAt
    updatedAt
  }
}`


export const deleteUserById = gql`
mutation Mutation($userId: ID!) {
  deleteUser(userID: $userId) {
    userID
    email
    role
    createdAt
    updatedAt
  }
}
`
