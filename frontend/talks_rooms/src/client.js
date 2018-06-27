import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import resolvers from './resolvers';

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql"
});

const defaultState = {
  CurrentGame:{
    __typename: 'CurrentGame',
    teamAScore:0
  }
}
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: defaultState
});

const link = ApolloLink.from([stateLink, httpLink]);
const client = new ApolloClient({
  link,
  cache
});

export default client;
