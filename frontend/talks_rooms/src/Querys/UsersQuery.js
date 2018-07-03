import gql from "graphql-tag";
const UserQuery= gql`
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

export default UserQuery;
