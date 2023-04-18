import { gql } from "@apollo/client";


export const archiveByType = gql`query GetAllArchive($type: String!) {
    getArchivebyType(type: $type) {
      createdAt
      status
      type
      archiveID
      job {
        jobPostID
        title
        createdAt
        users {
        profile {
          profileID
          firstname
          lastname
        }
      }
      }
      endorse {
        company {
          companyName
        }
        endorsement {
          applicants {
            applicantID
            id
            applicantProfile {
              firstname
              lastname
            }
          }
        }
      }
      applicants {
        applicantID
        id
        applicantProfile {
          profileID
          firstname
          lastname
        }
        createdAt
      }
    }
  }`