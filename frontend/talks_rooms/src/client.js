import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "moment/locale/ru";
import moment from 'moment';
import gql from 'graphql-tag';

const dateStart = moment().format()
const timeStart = moment().format('LT');
const dateEnd =moment().add(30, 'minutes').format();
const timeEnd = moment().add(30, 'minutes').format('LT');
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
                timeStart,
                timeEnd,
                dateStart,
                dateEnd,

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
                dateTime:changedForm
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
