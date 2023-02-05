import { gql } from '@apollo/client'


export const LoginUsers = gql`mutation Mutation($auth: AuthInput, $pin: String!) {
  login(Auth: $auth, pin: $pin) {
    token
  }
}`


export const ApplicantLogs = gql`mutation Mutation($viewMyApplicationId: String!, $email: EmailAddress!) {
  viewMyApplication(id: $viewMyApplicationId, email: $email) {
    token
  }
}`