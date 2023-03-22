import { gql } from '@apollo/client'


export const notificationQuery = gql`
  query GetNotificationByStatus {
  getNotificationByStatus {
    notificationID
    notificationStatus
    createdAt
    user {
      profile {
        firstname
        lastname
      }
    }
    notificationJob {
      jobPostID
      title
      description
      responsibilities
      qualification
      status
      createdAt
      users {
        profile {
          firstname
          lastname
        }
      }
    }
    userApplications {
      id
      createdAt
      applicantProfile {
        firstname
        lastname
      }
    }
    title
  }
}
`

export const notificationAllQuery = gql`query GetAllNotification {
  getAllNotification {
    notificationID
    notificationStatus
    createdAt
    user {
      profile {
        firstname
        lastname
      }
    }
    notificationJob {
      jobPostID
      title
      description
      responsibilities
      qualification
      status
      createdAt
      users {
        profile {
          firstname
          lastname
        }
      }
    }
    userApplications {
      id
      createdAt
      applicantProfile {
        firstname
        lastname
      }
    }
    title
  }
}`

export const notificationById = gql`query GetNotificationID($notificationId: ID!) {
    getNotificationID(notificationID: $notificationId) {
      notificationID
      createdAt
      user {
        profile {
          firstname
          lastname
        }
      }
      notificationJob {
        jobPostID
        title
        description
        qualification
        responsibilities
        status
        createdAt
        details {
            jobDetailsID
            location
              jobType
              workType
              salary
       }
      }
    }
  }`