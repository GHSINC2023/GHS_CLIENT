import { gql } from "@apollo/client";


export const updateNotificationStat = gql`mutation Mutation($notificationId: ID!) {
    updateNotificationStatus(notificationID: $notificationId) {
      notificationID
    }
  }`