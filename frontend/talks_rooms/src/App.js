import React from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import Hat from './Components/Hat.js'
import Form from './Form.js'
// import {graphql,compose} from 'react-apollo';
// import gql from "graphql-tag";
import LocalQuery from './Querys/LocalQuery.js';
import { Query } from "react-apollo";
import WithData from './HOC/FetchData.js'
import gql from 'graphql-tag';


// const AllQuery = gql`
//   query : {
//     current:@client {
//       name
//     }
//   }
//     `

// const FooComp = ({...props})=>{
//   console.log(props)
//   return(
//     <div>
//       "dd"
//     </div>
//   )
// }
//
//
// const GET_SELECTED_REPOSITORIES = gql`
//   query {
//     networkStatus @client {
//       isConnected,
//     }
//     formState @client{
//       theme,
//       choosedUsers,
//       dateTime{
//         dateStart,
//         dateEnd
//       }
//     }
//   }
// `;
//
// const Repositories = ( ) => (
//   <Query query={GET_SELECTED_REPOSITORIES}>
//     {({data }) =>
//         <FooComp
//           data={data}/>
//     }
//   </Query>
// );
//




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
