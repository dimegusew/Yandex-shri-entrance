import React from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import Hat from './Components/Hat.js'
import Form from './Form.js'
import {graphql,compose} from 'react-apollo';
// import gql from "graphql-tag";
import LocalQuery from './Querys/LocalQuery.js'

// const AllQuery = gql`
//   query : {
//     current:@client {
//       name
//     }
//   }
//     `

const Footer=({...props})=>{
  console.log(props)
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

const FooterWithData=compose(
  graphql(LocalQuery,{
    props:({data:{ CurrentGame }})=>({
    CurrentGame
  })

})
)(Footer)

const App =()=>{
  return(
    <ApolloProvider client={client}>
        <div className="App">
          <Hat/>
          <Form/>
          <FooterWithData/>
        </div>
    </ApolloProvider>
  )
}
export default App;
