import { gql } from "@apollo/client";

export const CreateEndorse = gql`
mutation Mutation($endorsementId: ID!, $companyId: ID!, $userId: ID!) {
  createEndorse(endorsementID: $endorsementId, companyID: $companyId, userID: $userId) {
    createdAt
    endorseID
    company {
      companyID
    }
  }
}`

export const updateEndorse = gql`mutation Mutation($endorseStatus: String!, $endorseId: ID!, $userId: ID!) {
  updateEndorse(endorseStatus: $endorseStatus, endorseID: $endorseId, userID: $userId) {
    createdAt
    endorseID
    endorseStatus
  }
}`


export const endorseCSV = gql`mutation GetEndorseByCSV($status: String!, $orders: orderedBy!, $end: String!, $start: String!, $userId: ID) {
  getEndorseByCSV(status: $status, orders: $orders, end: $end, start: $start, userID: $userId) {
    endorseStatus
    createdAt
    endorseID
    endorsement {
      applicants {
        applicantProfile {
          firstname
          lastname
          phone
          birthday
        }
        applyJobPost {
          title
        }
      }
    }
  }
}`