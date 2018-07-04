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
                date:""

              },
              theme: "",
              choosedUsers: [],
              us:"",
              // isValid:{
              //   theme: false,
              //   dateTime:true,
              //   users:false
              // }
            }


    },
    resolvers: {
      Query: {},
      Mutation: {
        updateFormState: (_, { changedForm }, { cache }) => {
            console.log(changedForm)
          // const query = gql`
          //   query {
          //     formState @client{
          //       dateTime{
          //         dateStart,
          //         dateEnd
          //       }
          //     }
          //     networkStatus @client {
          //       isConnected
          //       }
          //   }
          // `;

          // const previous = cache.readQuery({ query });
          // const newChangedForm = changedForm;

          cache.writeData({
            data: {
              formState: {
                __typename: "formState",
                dateTime:changedForm
              }
            }
          });
          return null;
        },

        updateThemeState: (_, { theme }, { cache }) => {
          cache.writeData({
            data: {
              formState: {
                __typename: "formState",
                theme
              }
            }
          });
          return null;
        },

        addUsersState: (_, { user }, { cache }) => {
          const query= gql`
                {
                  users {
                    id
                    login
                    homeFloor
                    avatarUrl
                  }
                  formState @client{
                    choosedUsers,
                    us
                  }
                }
              `

          const previous = cache.readQuery({ query });
          const currentUser = previous.users.find(el => el.login === user)
          const data = [...previous.formState.choosedUsers,currentUser]
          console.log(data)

          // cache.writeData({
          //   data: {
          //     formState: {
          //       __typename: "formState",
          //       us:user
          //     }
          //   }
          // });
          // return null;
        }
      }
    }
  }
});



export default client;
