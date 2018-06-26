import React, { Component } from "react";
import { InputWithDropDown } from "../Components/Input.js";
import WithData from '../HOC/FetchData.js';
import UsersQuery from '../Querys/UsersQuery.js';

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

class UserChecker extends Component {

  setUser = (users, userLogin) => {
    return users.find(el => el.login === userLogin);
  };

  deleteUser = (users, userLogin) => {
    return users.filter(el => el.login !== userLogin);
  };

  render() {
    let {users} = this.props.data;
    return (
      <div>
        <InputWithDropDown
          name={"Участники"}
          users={users}
          placeholder={`Например,${users[0].login}`}
          className="text-input"
          choosedUsers={this.props.choosedUsers}
          onInp={
            data =>
            this.props.userChoose([
              ...this.props.choosedUsers,
              this.setUser(users, data)
            ])
          }
        />
        <UserList
          onDeleteClick={data =>
            this.props.userChoose(
              this.deleteUser(this.props.choosedUsers, data.target.id)
            )
          }
          {...this.props}
        />
      </div>
    );
  }
}


export default WithData(UserChecker,UsersQuery);
