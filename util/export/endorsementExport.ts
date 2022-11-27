import { gql } from "@apollo/client";


export const EndorsementMutation = gql`mutation Mutation($status: String!, $start: String!, $end: String!, $order: orderedBy) {
  getEndorsmentByCSV(status: $status, start: $start, end: $end, order: $order) {
    endorsementID
    Status
    createdAt
    email
    endorseBy {
      profile {
        firstname
        lastname
      }
    }
    profile {
      firstname
      lastname
      phone
      birthday
      profileAddress {
        city
        province
        street
        zipcode
      }
    }
  }
}`
