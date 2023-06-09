import '../styles/globals.scss'
import PageWithLayout from '../layout/page.layout'
import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

type AppLayoutPage = {
  Component: PageWithLayout
  pageProps: any
  router: any
}


const UploadLink = createUploadLink({
  uri: "https://ghstested.herokuapp.com/graphql",
  credentials: "include",
  headers: {
    'Apollo-Require-Preflight': 'true',
  },

})


const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
  url: "wss://ghstested.herokuapp.com/graphql",

})) : null


const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, webSocketLink, UploadLink) : UploadLink



export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getJobByStatus: {
            merge(existing, incoming: []) {
              return [ ...incoming ]
            }
          },
          getNotificationByStatus: {
            merge(existing, incoming: []) {
              return [ ...incoming ]
            }
          },
          getEndorsementSpecificStatus: {
            merge(existing, incoming: []) {
              return [ ...incoming ]
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "cache-first",
      fetchPolicy: "no-cache",
      pollInterval: 4000,
      errorPolicy: "ignore"
    },
    query: {
      errorPolicy: "ignore",
      fetchPolicy: "no-cache"
    }
  }
})
function MyApp({ Component, pageProps }: AppLayoutPage) {

  const Layout = Component.layout || (({ children }: any) => <>{children}</>)


  useEffect(() => {
    const cookies = Cookies.get("ghs_access_token")
    if (cookies) {
      const { exp }: any = jwtDecode(cookies)
      if (new Date().getTime() === exp) {
        Cookies.remove("ghs_access_token")
      }
    }
  })

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
