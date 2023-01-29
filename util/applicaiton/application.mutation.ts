import { gql } from '@apollo/client'


export const createAnApplication = gql`mutation Mutation($jobPostId: ID!, $email: EmailAddress!, $profile: ProfileInput, $address: AddressInput, $file: Upload, $video: Upload) {
    createApplication(jobPostID: $jobPostId, email: $email, Profile: $profile, Address: $address, file: $file, video: $video) {
      applicantID
      id
      status
      email
      createdAt
      updatedAt
      applicantProfile {
        firstname
        lastname
        birthday
        phone
        profileAddress {
          addressID
          city
          province
          street
          zipcode
        }
      }
      applicantUpload {
        file
        uploadFileID
        video
        createdAt
      }
    }
  }`

export const createScreenApplicant = gql`mutation Mutation($applicantId: ID!, $end: String!, $userId: ID!, $start: String!) {
  createScreening(applicantID: $applicantId, end: $end, userID: $userId, start: $start) {
    screeningID
  }
}`

export const updateApplicantStatus = gql`mutation Mutation($applicantId: ID!, $status: String!, $userId: ID!) {
  updateApplicantStatus(applicantID: $applicantId, status: $status, userID: $userId) {
    applicantID
    id
  }
}`


export const terminateApplication = gql`mutation TerminateMyApplication($applicantId: ID!) {
  terminateMyApplication(applicantID: $applicantId) {
    id
  }
}`