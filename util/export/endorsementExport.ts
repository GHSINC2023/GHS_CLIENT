import { gql } from "@apollo/client";


export const EndorsementMutation = gql`mutation GetEndorsmentByCSV($status: String!, $end: String!, $start: String!, $order: orderedBy) {
  getEndorsmentByCSV(status: $status, end: $end, start: $start, order: $order) {
    Status
    createdAt
    endorsementID
    applicants {
      id
      email
      applicantProfile {
        firstname
        lastname
        phone
      }
    }
    endorseBy {
      profile {
        firstname
        lastname
      }
      role
    }
  }
}`
