import { gql } from '@apollo/client'


export const LoginUsers = gql`mutation Mutation($auth: AuthInput) {
    login(Auth: $auth) {
      token
    }
  }`