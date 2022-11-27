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

export const viewMyApplicaiton = gql`mutation ViewMyApplication($viewMyApplicationId: String!, $email: EmailAddress) {
  viewMyApplication(id: $viewMyApplicationId, email: $email) {
    applicantID
    id
    status
    email
    createdAt
    updatedAt
    applicant_upload {
      uploadFileID
      file
      video
    }
    applicant_profile {
      firstname
      lastname
      phone
      birthday
      profileAddress {
        city
        province
        zipcode
        street
      }
    }
  }
}`


export const updateApplicantStatus = gql`mutation Mutation($applicantId: ID!, $status: String!) {
  updateApplicantStatus(applicantID: $applicantId, status: $status) {
    applicantID
    status
    updatedAt
  }
}`