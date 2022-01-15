import { gql } from '@apollo/client'

export const LIST_USERS = gql`
  query Users($limit: Int!, $nextToken: String) {
    listUser(limit: $limit, nextToken: $nextToken) {
      items {
        id,
        name,
        description
      },
      nextToken
    }
  }
`