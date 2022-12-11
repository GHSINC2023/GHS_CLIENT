import { gql } from '@apollo/client'


export const endorseTo = gql`query GetEmployerCompany($limit: Int!, $offset: Int!) {
    getEmployerCompany(limit: $limit, offset: $offset) {
      companyID
      companyName
    }
  }`

export const getAllEndorseForMyCompany = gql`query GetAllEndorse {
  getAllEndorse {
    endorseID
  }
}`
export const getEndorseByCompany = gql`query GetEndorseByStatus($status: String!, $limit: Int!, $userId: ID!, $order: orderedBy!, $offset: Int!) {
  getEndorseByStatus(status: $status, limit: $limit, userID: $userId, order: $order, offset: $offset) {
    endorseID
    endorseStatus
    createdAt
    endorsement {
      email
      profile {
        firstname
        lastname
        phone
      }
    }
  }
}`

export const getEndorseByIDs = gql`query GetEndorseByID($endorseId: ID!) {
  getEndorseByID(endorseID: $endorseId) {
    endorseID
    createdAt
    endorseStatus
    feedback {
        feedbackID
        feedback
        createdAt
    }
    endorsement {
      email
      profile {
        profileID
        firstname
        lastname
        birthday
        phone
        profileAddress {
          addressID
          city
          province
          street
          zipcode
        }
      }

      endorseBy {
        profile {
          profileID
          firstname
          lastname
        }
      }
    }
  }
}`

export const getEndorsementFeed = gql`query($endorsementId: String!) {
  getEndorsementFeedback(endorsementID: $endorsementId) {
    endorseID
    feedback {
      feedbackID
      feedback
      user {
        profile {
          profileID
          firstname
          lastname
        }
      }
      createdAt
    }
    company {
      companyName
    }
  }
}`