import { gql } from "@apollo/client";


export const changeUserPin = gql`mutation ChangePin($pin: String!, $rePin: String!, $userId: ID!) {
  changePin(pin: $pin, rePin: $rePin, userID: $userId) {
    userID
  }
}`