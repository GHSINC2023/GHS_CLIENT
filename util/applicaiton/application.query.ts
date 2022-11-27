import { gql } from '@apollo/client'


export const applicationQuery = gql`
query GetApplicationByStatus($status: String!, $limit: Int!, $order: orderedBy!) {
  getApplicationByStatus(status: $status, limit: $limit, order: $order) {
    applicantID
    id
    status
    email
    createdAt
    updatedAt
    applicantProfile {
      profileID
      firstname
      lastname
      profileAddress {
        addressID
        city
        province
        zipcode
        street
      }
    }
    applicantInterviewer {
      interviewerID
      user {
        profile {
          firstname
          lastname
        }
      }
    }
    applyJobPost {
      title
    }
    applicantUpload {
      file
      video
    }
  }
}
`

export const getApplicationID = gql`query GetApplicationByStatus($applicationId: ID!) {
  getApplicantByID(applicationID: $applicationId) {
    applicantID
    id
    status
    email
    createdAt
    updatedAt
    applicantProfile {
      profileID
      firstname
      lastname
      phone
      birthday
      profileAddress {
        addressID
        city
        province
        zipcode
        street
      }
    }
    applicantInterviewer {
      interviewerID
      user {
        profile {
          profileID
          firstname
          lastname
        }
      }
    }
    applicantUpload {
      file
      video
    }
  }
}`


export const getApplications = gql`query GetAllApplication {
  getAllApplication {
    applicantID
    id
    status
    email
    createdAt
    updatedAt
  }
}`