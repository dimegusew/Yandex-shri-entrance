import React from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import Hat from './Components/Hat.js'
import Form from './Form.js'

const Footer=()=>{
  return(
    <div className='bottom'>
      <div className="footer">
        <button>
          Отмена
        </button>
          <button>
            Создать
          </button>
      </div>
    </div>
  )
}

const App =()=>{
  return(
    <ApolloProvider client={client}>
        <div className="App">
          <Hat/>
          <Form/>
          <Footer/>
        </div>
    </ApolloProvider>
  )
}
export default App;
