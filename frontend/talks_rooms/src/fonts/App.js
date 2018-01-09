import React, { Component } from 'react';
import './App.css';

import CreateButton from './CreateButton'
import AddButton from './AddButton.js'
import UpperBar from './UpperBar.js'
import MainBody from './MainBody.js'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import AppContainer from "./AppContainer.js"
import {Link} from 'react-router-dom';



const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer>
          <UpperBar>
            <Link to="/event">
            <CreateButton text="Создать встречу" className="create-button"/>
          </Link>
          </UpperBar>
          <MainBody/>
        </AppContainer>
      </ApolloProvider>
    );
  }
}

export default App
