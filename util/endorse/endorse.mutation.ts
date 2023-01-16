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


export const endorseCSV = gql`mutation GetEndorseByCSV($userId: ID, $status: String!, $orders: orderedBy!, $end: String!, $start: String!) {
  getEndorseByCSV(userID: $userId, status: $status, orders: $orders, end: $end, start: $start) {
    endorse {
      createdAt
      endorseID
      endorseStatus
      endorsement {
        applicants {
          email
          applicantProfile {
            firstname
            lastname
            birthday
            phone
          }
          applyJobPost {
            title
          }
        }
      }
    }
  }
}`