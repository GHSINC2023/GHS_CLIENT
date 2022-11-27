import { gql } from '@apollo/client'

export const uservalues = gql`query($name: String!) {
    __type(name: $name) {
      enumValues {
        name
      }
    }
}`