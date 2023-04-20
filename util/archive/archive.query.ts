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
          applyJobPost {
            title
          }
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
      applyJobPost {
        title
      }
      applicantProfile {
        firstname
        lastname
      }
      createdAt
    }
  }
}
`

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