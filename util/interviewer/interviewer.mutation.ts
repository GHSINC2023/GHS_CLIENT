import { gql } from "@apollo/client";

export const CreateInterviewer = gql`mutation Mutation($userId: ID!, $applicantId: ID!) {
    createInterviewer(userID: $userId, applicantID: $applicantId) {
      createdAt
      interviewerID
    }
  }`