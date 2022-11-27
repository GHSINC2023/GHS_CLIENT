import { gql } from '@apollo/client'


export const endorseTo = gql`query GetEmployerCompany($limit: Int!, $offset: Int!) {
    getEmployerCompany(limit: $limit, offset: $offset) {
      companyID
      companyName
    }
  }`