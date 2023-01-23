import { gql } from "@apollo/client";


export const createOTPS = gql`mutation Mutation($email: EmailAddress!) {
    createOTP(email: $email) {
      createdAt
      expiredAt
      otp
      OTPID
    }
  }`



export const verifyMyOTP = gql`
mutation FindOTP($otp: String!) {
  verifyOTP(otp: $otp) {
    otp
    OTPID
    expiredAt
  }
}
`