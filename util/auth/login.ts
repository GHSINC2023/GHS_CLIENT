import { gql } from '@apollo/client'


export const LoginUsers = gql`mutation Mutation($auth: AuthInput) {
    login(Auth: $auth) {
      token
    }
  }`


export const ApplicantLogs = gql`mutation Mutation($viewMyApplicationId: String!, $email: EmailAddress!) {
  viewMyApplication(id: $viewMyApplicationId, email: $email) {
    token
  }
}`