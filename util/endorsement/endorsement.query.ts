import { gql } from '@apollo/client'


export const endorsementByStatus = gql`
query GetEndorsementSpecificStatus($status: String!, $limit: Int!, $offset: Int!, $order: orderedBy) {
  getEndorsementSpecificStatus(status: $status, limit: $limit, offset: $offset, order: $order) {
    endorsementID
    endorseBy {
      profile {
        firstname
        lastname
      }
    }
    applicants {
      applicantProfile {
        firstname
        lastname
      }
    }
    Status
    createdAt
    updatedAt
  }
}
`

export const getAllEndorsement = gql`query GetEndorsementAll {
  getEndorsementAll {
    endorsementID
  }
}`

export const getEndorsementGroup = gql`query GetAllEndorsementByGroup {
  getAllEndorsementByGroup {
    _count
    createdAt
  }
}`

export const endorsementById = gql`query GetEndorsementById($endorsementId: ID!) {
  getEndorsementById(endorsementID: $endorsementId) {
    endorsementID
    Status
    createdAt
    endorseBy {
      profile {
        profileID
        firstname
        lastname
      }
    }
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
    endorsementComment {
      commentID
      message
      notes
      createdAt
      updatedAt
    }
  }
}`


export const endorsementComment = gql`query Query($endorsementId: ID!) {
  getEndorsementCommnet(endorsementID: $endorsementId) {
    commentID
    createdAt
    message
    updatedAt
  }
}`