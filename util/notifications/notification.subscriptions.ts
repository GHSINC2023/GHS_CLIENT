import { gql } from "@apollo/client";

export const notifSub = gql`subscription Subscription {
    NotificationSubscriptions {
      notificationID
      createdAt
      notificationStatus
      title
      notificationJob {
        jobPostID
        title
        description
        qualification
        responsibilities
        status
        createdAt
        users {
        profile {
          firstname
          lastname
        }
      }
      }
      user {
        profile {
          firstname
          lastname
        }
      }
      userApplications {
      id
      createdAt
      applicantProfile {
        firstname
        lastname
      }
      applicantID
    }
    }
  }`