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
  mutation($user: Object) {
    addUsersState(user: $user) @client
  }
`;


const UserChecker = ({...props})=>{
  let {users} = props.data;
  let {choosedUsers} = props.data.formState
  console.log(props.data.formState)
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
          // data =>
          // this.props.userChoose([
          //   ...this.props.choosedUsers,
          //   this.setUser(users, data)
          // ])
        }
      />
      {/* <UserList
        onDeleteClick={d=>console.log(d)
          // data =>
          // this.props.userChoose(
          //   this.deleteUser(this.props.choosedUsers, data.target.id)
          // )
        }
        choosedUsers={choosedUsers}
        // {...this.props}
      /> */}
    </div>
  );
}


//
// class UserChecker extends Component {
//
//   // setUser = (users, userLogin) => {
//   //   return users.find(el => el.login === userLogin);
//   // };
//   //
//   // deleteUser = (users, userLogin) => {
//   //   return users.filter(el => el.login !== userLogin);
//   // };
//
//   render() {
//     console.log(this.props)
//     let {users} = this.props.data;
//     let {choosedUsers} = this.props.data.formState
//     return (
//       <div>
//         <InputWithDropDown
//           name={"Участники"}
//           users={users}
//           placeholder={`Например,${users[0].login}`}
//           className="text-input"
//           choosedUsers={choosedUsers}
//           onInp={(user)=>
//             this.props.mutate({
//               variables: {
//                 user
//               }
//             })
//             // data =>
//             // this.props.userChoose([
//             //   ...this.props.choosedUsers,
//             //   this.setUser(users, data)
//             // ])
//           }
//         />
//         <UserList
//           onDeleteClick={d=>console.log(d)
//             // data =>
//             // this.props.userChoose(
//             //   this.deleteUser(this.props.choosedUsers, data.target.id)
//             // )
//           }
//           choosedUsers={choosedUsers}
//           // {...this.props}
//         />
//       </div>
//     );
//   }
// }

const UserCheckerWithData = WithData(UserChecker,UsersQuery);

export default compose(
  graphql(addUserMutation)
)(UserCheckerWithData);
