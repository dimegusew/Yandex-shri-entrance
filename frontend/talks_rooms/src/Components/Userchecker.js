import React, { Component } from "react";
import { InputWithDropDown } from "../Components/Input.js";
import WithData from '../HOC/FetchData.js';
import UsersQuery from '../Querys/UsersQuery.js';
import { graphql, compose, Query } from "react-apollo";
import gql from 'graphql-tag';

const User = ({ ...props }) => {
  return (
    <div className="choosed-user">
      <img alt={"user-avatar"} src={props.avatarUrl} />
      <p>{props.login}</p>
      <div id={props.login} onClick={props.onDeleteClick}>
        x
      </div>
    </div>
  );
};

const UserList = ({ ...props }) => {
  return (
    <div className="user-list">
      {props.choosedUsers.map(el => <User {...el} key={el.id} {...props} />)}
    </div>
  );
};


const addUserMutation= gql`
  mutation($user: Object!) {
    addUsersState(user: $user) @client
  }
`;


const UserChoose = ({...props})=>{
  let {users} = props.data;
  let {choosedUsers} = props.data.formState
  return (
    <div>
      <InputWithDropDown
        name={"Участники"}
        users={users}
        placeholder={`Например,${users[0].login}`}
        className="text-input"
        choosedUsers={choosedUsers}
        onInp={(user)=>
          props.mutate({
            variables: {
              user
            }
          })
        }
      />
      <UserList
        onDeleteClick={d=>console.log(d)}
        choosedUsers={users.filter(el=>choosedUsers.indexOf(el.login)!==-1)}
      />
    </div>
  );
}

const UserChooseWithData = WithData(UserChoose,UsersQuery);

export default compose(
  graphql(addUserMutation)
)(UserChooseWithData);
