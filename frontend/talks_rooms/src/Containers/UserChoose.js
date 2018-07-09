import React from "react";
import { InputWithDropDown } from "../Components/Input.js";
import WithData from '../HOC/FetchData.js';
import UsersQuery from '../Querys/UsersQuery.js';
import { graphql, compose} from "react-apollo";
import gql from 'graphql-tag';
import UserList from '../Components/UserList.js'

const UserChoose = ({...props})=>{
  let {users} = props.data;
  let {choosedUsers} = props.data.formState;
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
              user:{type:'ADD_USER',user}
            }
          })
        }
      />
      <UserList
        onDeleteClick={
          (user)=>
          props.mutate({
            variables: {
              user:{type:'DELETE_USER',user:user.target.id}
            }
          })
        }
        choosedUsers={users.filter(el=>choosedUsers.indexOf(el.login)!==-1)}
      />
    </div>
  );
}

const addUserMutation= gql`
  mutation($user: Object!) {
    addUsersState(user: $user) @client
  }
`;

export default compose(
  graphql(addUserMutation),

)(WithData(UserChoose,UsersQuery));
