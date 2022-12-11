import { gql } from "@apollo/client";


export const feedCreate = gql`mutation Mutation($feedback: String!, $userId: ID!, $endorseId: ID!) {
    createAFeedback(feedback: $feedback, userID: $userId, endorseID: $endorseId) {
      feedback
      feedbackID
      endorse {
        createdAt
        endorseID
      }
    }
  }`

