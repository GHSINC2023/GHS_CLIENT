import { gql } from "@apollo/client";

export const getArchiveID = gql`query GetArchiveID($archiveId: ID!) {
  getArchiveID(archiveID: $archiveId) {
    archiveID
    type
    applicants {
      applicantID
      id
      email
      applyJobPost {
            title
          }
      applicantProfile {
        firstname
        lastname
        phone 
        birthday
        profileAddress {
          street
          city
          province
          zipcode
        }
      }
    }
    createdAt
    endorse {
      company {
        companyName
      }
      endorsement {
        applicants {
          applicantID
          id
          email
          applicantProfile {
            firstname
            lastname
            phone
             birthday
          }
        }
      }
    }
    job {
      title
      qualification
      responsibilities
      description
      details {
        location
        workType
        jobType
        salary
      }
    }
  }
}`


export const filterArchive = gql`query GetArchiveByDate($start: String!, $end: String!, $type: String!) {
  getArchiveByDate(start: $start, end: $end, type: $type) {
      archiveID
     type
    applicants {
      applicantID
      id
      email
      applyJobPost {
            title
          }
      applicantProfile {
        firstname
        lastname
        phone 
        birthday
        profileAddress {
          street
          city
          province
          zipcode
        }
      }
    }
    createdAt
    endorse {
      company {
        companyName
      }
      endorsement {
        applicants {
          applicantID
          id
          email
          applyJobPost {
            title
          }
          applicantProfile {
            firstname
            lastname
            phone
             birthday
          }
        }
      }
    }
    job {
      title
      qualification
      responsibilities
      description
      users {
        profile {
          profileID
          firstname
          lastname
        }
      }
      details {
        location
        workType
        jobType
        salary
      }
    }
  }
}`