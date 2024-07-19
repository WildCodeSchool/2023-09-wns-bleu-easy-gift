// import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { createClient } from 'graphql-ws';
// require('dotenv').config();

// const devApiUrl = process.env.NEXT_PUBLIC_APOLLO_URI


// const wsUrl = 'ws://localhost:4001';
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: wsUrl!,
//   })
// );

// const httpLink = new HttpLink({
//   uri: devApiUrl ? devApiUrl : '/graphql',
//   credentials: 'include',
// });


// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       nextFetchPolicy: 'cache-and-network',
//     },
//   },
// });

// export default client
import { ApolloClient, HttpLink, split, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
require('dotenv').config();

const devApiUrl = process.env.NEXT_PUBLIC_APOLLO_URI

// const wsUrl = devApiUrl
//   ? devApiUrl.replace(/^http/, 'ws') + '/subscriptions'
//   : '/subscriptions';
// const wsUrl = process.env.NEXT_PUBLIC_APOLLO_WB_URI;
const wsUrl = 'ws://localhost:4001';
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl!,
  })
);
// const httpLink = new HttpLink({
//   uri: devApiUrl ? devApiUrl : '/graphql',
//   credentials: 'include',
// });
const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
});
console.log('wsLink', wsLink);
console.log('httpLink', httpLink);
console.log('WebSocket URL:', wsUrl);
console.log('devApiUrl', devApiUrl);

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

export default client