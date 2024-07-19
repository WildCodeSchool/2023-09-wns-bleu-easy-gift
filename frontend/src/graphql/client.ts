import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
require('dotenv').config();

const devApiUrl = process.env.NEXT_PUBLIC_APOLLO_URI

const wsUrl = 'ws://localhost:4001';
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl!,
  })
);
const httpLink = new HttpLink({
  uri: devApiUrl ? devApiUrl : '/graphql',
  credentials: 'include',
});

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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'cache-and-network',
    },
  },
});

export default client