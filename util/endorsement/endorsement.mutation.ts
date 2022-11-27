import { gql } from "@apollo/client";


export const endorsementUpdate = gql`
mutation updateEndorsement($endorsementId: ID!, $status: String!) {
  updateEndorsement(endorsementID: $endorsementId, Status: $status) {
    endorsementID
    Status
    createdAt
    updatedAt
    profile {
      profileID
      firstname
      lastname
      phone
      birthday
    }
  }
}
`
export const endorsementCreate = gql`
 mutation Mutation($userId: ID!, $email: EmailAddress!, $profile: ProfileInput, $address: AddressInput) {
  createEndorsement(userID: $userId, email: $email, Profile: $profile, Address: $address) {
    endorsementID
    Status
    createdAt
    updatedAt
    profile {
      profileID
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
}
`
export const generateMeCSVEndorsement = gql`mutation Mutation($status: String!, $start: String!, $end: String!, $order: orderedBy, $limit: Int!) {
  getEndrosemetnByCSV(status: $status, start: $start, end: $end, order: $order, limit: $limit) {
    endorsementID
    email
    Status
    createdAt
    updatedAt
    profile {
      birthday
      firstname
      lastname
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
        lastname
        firstname
      }
    }
  }
}`

export const commentEndorsement = gql`mutation Mutation($endorsementId: ID!, $comments: commentInput) {
  createComment(endorsementID: $endorsementId, comments: $comments) {
    commentID
    createdAt
    message
    notes
  }
}`