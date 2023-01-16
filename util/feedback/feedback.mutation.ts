import { gql } from "@apollo/client";


export const feedCreate = gql`
mutation Mutation($feedback: String!, $userId: ID!, $applicantId: ID!, $endorseId: ID!) {
  createAFeedback(feedback: $feedback, userID: $userId, applicantID: $applicantId, endorseID: $endorseId) {
    createdAt
    feedback
    feedbackID
    endorse {
      createdAt
      endorseID
    }
  }
}
`

