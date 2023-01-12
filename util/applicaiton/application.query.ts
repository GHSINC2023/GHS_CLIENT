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
          profileID
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


export const getApplicationByDate = gql`query GetAllApplicationDateCount {
  getAllApplicationDateCount {
    createdAt
    _count
  }
}`

export const getApplicationDWYMY =gql`query GetApplicantByDWMY($select: String!) {
  getApplicantByDWMY(select: $select) {
    _count
    createdAt
  }
}`


export const getMyApplicaiton = gql`query GetApplicantByID($applicationId: ID!) {
  getApplicantByID(applicationID: $applicationId) {
    email
    status
    createdAt
    applyJobPost {
      title
    }
    applicantProfile {
      firstname
      lastname
      birthday
      phone
      profileAddress {
        province
        street
        zipcode
        city
      }
    }
    applicantUpload {
      file
      video
    }
  }
}`