import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://i35vw6q2ovb5ljhcmdvzqsdkle.appsync-api.us-east-2.amazonaws.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'X-Api-Key': 'da2-23237psur5dsfkdsfjdvmgufuy'
  }
})

export default client