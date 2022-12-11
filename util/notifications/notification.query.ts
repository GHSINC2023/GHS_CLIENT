import { gql } from '@apollo/client'


export const notificationQuery = gql`
    query Query {
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
      qualification
      responsibilities
      status
      createdAt
    }
  }
}
`

export const notificationAllQuery = gql`query GetAllNotification {
  getAllNotification {
    notificationID
    createdAt
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
        jobPost {
          details {
            jobDetailsID
            category
            location
            salary
            workType
            jobType
          }
        }
      }
    }
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