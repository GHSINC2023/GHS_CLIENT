import { gql } from "@apollo/client";


export const jobSubscriptions = gql`subscription Subscription {
  createAJobPostSubscriptions {
    jobPostID
    title
    status
    qualification
    responsibilities
    description
    createdAt
    updatedAt
    applicants {
      applicantID
    }
    users {
      userID
      email
      role
      profile {
        firstname
        lastname
      }
    }
  }
}`