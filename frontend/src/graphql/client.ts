import { ApolloClient, InMemoryCache } from "@apollo/client";
require("dotenv").config();

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI,
  cache: new InMemoryCache(),
  credentials: "include",
  });

export default client;
