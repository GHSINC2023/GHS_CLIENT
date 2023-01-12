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
export const getEndorseByCompany = gql`query GetEndorseByStatus($userId: ID!, $status: String!, $limit: Int!, $order: orderedBy!, $offset: Int!) {
  getEndorseByStatus(userID: $userId, status: $status, limit: $limit, order: $order, offset: $offset) {
    createdAt
    endorseID
    endorseStatus
    endorsement {
      applicants {
        applicantProfile {
          firstname
          lastname
          phone
          birthday
        }
        email
      }
    }
  }
}`

export const getEndorseByIDs = gql`query GetEndorseByID($endorseId: ID!) {
  getEndorseByID(endorseID: $endorseId) {
    endorsement {
      applicants {
        applicantProfile {
          firstname
          lastname
          phone
          birthday
          profileAddress {
            province
            street
            zipcode
            city
          }
        }
        email
      }
      endorseBy {
        profile {
          firstname
          lastname
          profileID
        }
      }
    }
    endorseID
    endorseStatus
    createdAt
    feedback {
      feedback
      feedbackID
      createdAt
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

export const getEndorsementCount = gql`query GetEndorsementByDWMY($select: String!) {
  getEndorsementByDWMY(select: $select) {
    _count
    createdAt
  }
}`