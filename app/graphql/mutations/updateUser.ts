import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $address: String, $description: String, $name: String, $updatedAt: AWSDateTime) {
    updateUser(input: {id: $id, address: $address, description: $description, name: $name, updatedAt: $updatedAt}) {
      id,
    }
  }
`
