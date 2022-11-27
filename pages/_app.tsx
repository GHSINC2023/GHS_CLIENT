import '../styles/globals.scss'
import PageWithLayout from '../layout/page.layout'
import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'


type AppLayoutPage = {
  Component: PageWithLayout
  pageProps: any
  router: any
}


const UploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  headers: {
    'Apollo-Require-Preflight': 'true',
  }
})


const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
  url: "ws://localhost:4000/graphql",

})) : null


const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, webSocketLink, UploadLink) : UploadLink



export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
function MyApp({ Component, pageProps }: AppLayoutPage) {

  const Layout = Component.layout || (({ children }: any) => <>{children}</>)

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
