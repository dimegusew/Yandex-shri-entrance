import ApolloClient from "apollo-boost";
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
              choosedRoom:null
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

        addUsersState: (_, { user,type }, { cache }) => {
          const query= gql`
                {
                  users {
                    id
                    login
                    homeFloor
                    avatarUrl
                  }
                  formState @client{
                    choosedUsers
                  }
                }
              `

          const previous = cache.readQuery({ query });
           const updatedUsers = user.type==='ADD_USER' ?
            [...previous.formState.choosedUsers,user.user]
            : previous.formState.choosedUsers.filter(el=>el!==user.user)
          const data={
            formState:{
              __typename: "formState",
               choosedUsers:updatedUsers
             }
           }

          cache.writeData({data});
          return null;
        },

        addRoomState: (_, { room }, { cache }) => {
          console.log(room)
          const data={
            formState:{
              __typename: "formState",
               choosedRoom:room
             }
           }

          cache.writeData({data});
          return null;
        }
      }
    }
  }
});



export default client;
