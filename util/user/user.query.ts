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

export const getUserRoles = gql`query GetUserByRoles($limit: Int!, $offset: Int!, $role: String, $order: orderedBy) {
  getUserByRoles(limit: $limit, offset: $offset, role: $role, order: $order) {
    userID
    email
    role
    createdAt
    updatedAt
    profile {
      firstname
      lastname
      birthday
    }
    company {
      companyName
    }
  }
}`


export const  getCompanyEmployerGroup = gql`query GetEmployerCompanyGroup {
  getEmployerCompanyGroup {
    _count
    createdAt
  }
}`
export const getCompanyEmloyer = gql`query GetCompanyPartner {
  getCompanyPartner {
    companyID
  }
}`