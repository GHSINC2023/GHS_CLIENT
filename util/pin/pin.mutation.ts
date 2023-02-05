import { gql } from "@apollo/client";


export const changeUserPin = gql`mutation ChangePin($pin: Int!, $rePin: Int!, $userId: ID!) {
  changePin(pin: $pin, rePin: $rePin, userID: $userId) {
    userID
  }
}`