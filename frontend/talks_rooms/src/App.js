import React, { Component } from 'react';
import './App.css';

import CreateButton from './CreateButton'
import AddButton from './AddButton.js'
import UpperBar from './UpperBar.js'
import MainBody from './MainBody.js'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';



const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="container">
      <div className="App">
        <UpperBar/>
        <MainBody/>
      </div>
    </div>
  </ApolloProvider>
    );
  }
}

export default App
