import React, { Component } from 'react';
import './App.css';
import App from './App.js'
import EventEdit from './EventEdit.js'
import {HashRouter, Route} from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import AppContainer from "./AppContainer.js";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

class Router extends Component {
  render() {
    return (
  <ApolloProvider client={client}>
      <HashRouter>
        <div>
         <Route exact="exact" path="/" component={App}/>
         <Route exact="exact" path="/event" component={EventEdit}/>
       </div>
       </HashRouter>
  </ApolloProvider>
    );
  }
}

export default Router
