import React from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import Hat from './Components/Hat.js'
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
