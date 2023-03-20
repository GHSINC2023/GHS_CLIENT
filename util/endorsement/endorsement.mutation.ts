import { gql } from "@apollo/client";


export const endorsementUpdate = gql`
mutation updateEndorsement($endorsementId: ID!, $status: String!) {
  updateEndorsement(endorsementID: $endorsementId, Status: $status) {
    endorsementID
    Status
    createdAt
    updatedAt
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
  }
}`

export const commentEndorsement = gql`mutation Mutation($endorsementId: ID!, $userId: ID!, $comments: commentInput) {
  createComment(endorsementID: $endorsementId, userID: $userId, comments: $comments) {
    commentID
    message
  }
}`