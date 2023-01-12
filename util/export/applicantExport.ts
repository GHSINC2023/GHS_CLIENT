import { gql } from "@apollo/client";

export const applicationCSV = gql`mutation GenerateApplicantCSV($status: String!, $start: String!, $end: String!, $order: String!) {
    generateApplicantCSV(status: $status, start: $start, end: $end, order: $order) {
      id
      email
      status
      createdAt
      applyJobPost {
        title
      }
      applicantProfile {
        firstname
        lastname
        phone
        profileAddress {
          city
          province
          street
          zipcode
        }
      }
      applicantUpload {
        file
        video
      }
    }
  }`