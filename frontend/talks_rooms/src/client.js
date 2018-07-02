import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "moment/locale/ru";
import moment from 'moment';
import gql from 'graphql-tag';

const dateStart = moment().format()
const dateEnd =moment().add(30, 'minutes').format()
console.log(dateEnd)




const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  clientState: {
    defaults: {
      networkStatus: {
        __typename: "NetworkStatus",
        isConnected:""
      },


      formState:{
              __typename: "formState",
              dateTime: {
                __typename: "dateTimeState",
                dateStart,
                dateEnd
              },
              theme: "",
              choosedUsers: [],
              isValid:{
                theme: false,
                dateTime:true,
                users:false
              }
            }


    },
    resolvers: {
      Query: {},
      Mutation: {
        updateFormState: (_, { changedForm }, { cache }) => {

          const query = gql`
            query {
              formState @client{
                dateTime{
                  dateStart,
                  dateEnd
                }
              }
              networkStatus @client {
                isConnected
                }
            }
          `;

          const previous = cache.readQuery({ query });
          console.log(query)
          const newChangedForm = changedForm;
          console.log(changedForm)

          cache.writeData({
            data: {
              formState: {
                __typename: "formState",
                dateTime:{
                  __typename: "dateTimeState",
                  dateEnd:'2018-07-02T21:48:49+03:00'
                }
              }
            }
          });
          return null;
        }
      }
    }
  }
});



export default client;
