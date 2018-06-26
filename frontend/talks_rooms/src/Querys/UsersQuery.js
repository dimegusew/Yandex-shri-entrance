import gql from "graphql-tag";
const UserQuery= gql`
      {
        users {
          id
          login
          homeFloor
          avatarUrl
        }
      }
    `

export default UserQuery;
