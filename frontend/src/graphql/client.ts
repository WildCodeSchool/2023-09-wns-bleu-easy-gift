import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
require('dotenv').config();

const devApiUrl = process.env.NEXT_PUBLIC_APOLLO_URI;

const httpLink = new HttpLink({
  uri: devApiUrl ? devApiUrl : '/graphql',
  credentials: 'include',
});
const wsUrl = devApiUrl
  ? devApiUrl.replace(/^http/, 'ws') + 'graphql'
  : 'graphql';
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
  })
);
console.log('wsLink', wsLink);
console.log('httpLink', httpLink);
console.log('WebSocket URL:', wsUrl);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
console.log('splitLink', splitLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
