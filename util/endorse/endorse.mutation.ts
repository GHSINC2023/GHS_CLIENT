import { gql } from "@apollo/client";

export const CreateEndorse = gql`mutation CreateEndorse($endorsementId: ID!, $companyId: ID!, $userId: ID!) {
    createEndorse(endorsementID: $endorsementId, companyID: $companyId, userID: $userId) {
      endorseID
    endorseStatus
      comapny {
        companyID
    }
    }
  }`

export const updateEndorse = gql`mutation Mutation($endorseStatus: String!, $endorseId: ID!) {
    updateEndorse(endorseStatus: $endorseStatus, endorseID: $endorseId) {
      endorseID
      createdAt
    }
  }`