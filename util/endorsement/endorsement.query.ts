import { gql } from '@apollo/client'


export const endorsementByStatus = gql`
query GetEndorsementSpecificStatus($status: String!, $limit: Int!, $offset: Int!, $order: orderedBy) {
  getEndorsementSpecificStatus(status: $status, limit: $limit, offset: $offset, order: $order) {
    endorsementID
    Status
    createdAt
    updatedAt
    profile {
      firstname
      lastname
      phone
      birthday
    }
    endorseBy {
      profile {
        firstname
        lastname
      }
    }
    endorsementComment {
      commentID
      message
      notes
      createdAt
      updatedAt
    }
  }
}
`

export const getAllEndorsement = gql`query GetEndorsementAll {
  getEndorsementAll {
    endorsementID
  }
}`


export const endorsementById = gql`query GetEndorsementById($endorsementId: ID!) {
  getEndorsementById(endorsementID: $endorsementId) {
    endorsementID
    email
    Status
    createdAt
    endorseBy {
      profile {
        profileID
        firstname
        lastname
      }
    }
    profile {
      profileID
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