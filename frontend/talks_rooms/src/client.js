import ApolloClient from "apollo-boost";
import React from 'react';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

export default client;
