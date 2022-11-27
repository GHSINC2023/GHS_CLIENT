import { gql } from '@apollo/client'



export const createUserGHS = gql`mutation Mutation($role: roles!, $auth: AuthInput, $profile: ProfileInput) {
  createAccount(role: $role, auth: $auth, Profile: $profile) {
    userID
    email
    role
    createdAt
    updatedAt
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
