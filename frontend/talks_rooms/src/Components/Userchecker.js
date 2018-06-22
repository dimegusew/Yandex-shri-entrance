import React from 'react';
import {InputWithDropDown} from '../Components/Input.js'
import gql from "graphql-tag";
import { Query } from "react-apollo";

const User = ({...props})=>{
  return(
    <div className = "choosed-user">
      <img src={props.avatarUrl}/>
      <p5>{props.login}</p5>
      <p5 id ={props.login}
      onClick={props.onDeleteClick}>x</p5>
    </div>
  )
}

const UserList = ({users,...props})=>{
  return(
    <div className= 'user-list'>
      {users.map(el=>
        <User
          {...el}
          {...props}/>
      )}
    </div>
  )
}

const UserChecker=({...props})=>{
  return(
    <div>
      <InputWithDropDown
         {...props}/>
      <UserList {...props}/>
    </div>
  )
}

const UserCheckerWithData = ({...props}) => (
  <Query
    query={gql`
      {
        users {
          id
          login
          homeFloor
          avatarUrl
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      console.log(data.users)
      return (
         <UserChecker
            placeholder = {`Например,}`}
            data={data ? data.users:""}
            loading={loading}
            error={error}
             {...props}/>
      )
    }}
  </Query>
);

export default UserCheckerWithData;
