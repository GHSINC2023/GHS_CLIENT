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

export const updateEndorse = gql`mutation UpdateEndorsement($endorsementId: ID!, $status: String!) {
  updateEndorsement(endorsementID: $endorsementId, Status: $status) {
    Status
  }
}`