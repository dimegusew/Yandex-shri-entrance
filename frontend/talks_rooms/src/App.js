import React, { Component } from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from './Components/DateTime.js';
import InputWithName from './Components/Input.js'
import Mock from './MockUsers.js'
import UserChecker from './Components/Userchecker.js';
import {InputWithClearButton} from './Components/Input.js'
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
// import gql from "graphql-tag";
import Hat from './Components/Hat.js'
import Header from './Components/Header.js'
import Form from './Form.js'


const App =()=>{
  return(
    <ApolloProvider client={client}>
        <div className="App">
          <Hat/>
          <Form/>
        </div>
    </ApolloProvider>
  )
}
export default App;
