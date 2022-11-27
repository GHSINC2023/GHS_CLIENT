import { gql } from "@apollo/client";

export const notifSub = gql`subscription Subscription {
    NotificationSubscriptions {
      notificationID
      createdAt
      notificationStatus
      notificationJob {
        jobPostID
        title
        description
        qualification
        responsibilities
        status
        createdAt
      }
      user {
        profile {
          firstname
          lastname
        }
      }
    }
  }`