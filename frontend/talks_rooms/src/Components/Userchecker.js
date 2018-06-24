import React, { Component } from "react";
import { InputWithDropDown } from "../Components/Input.js";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
      {props.users.map(el => <User {...el} key={el.id} {...props} />)}
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
    let FirstUser = this.props.data ? this.props.data[0].login : "";
    return (
      <div>
        <InputWithDropDown
          name={"Участники"}
          placeholder={`Например,${FirstUser}`}
          className="text-input"
          onInp={data =>
            this.props.userChoose([
              ...this.props.users,
              this.setUser(this.props.data, data)
            ])
          }
          {...this.props}
        />
        <UserList
          onDeleteClick={data =>
            this.props.userChoose(
              this.deleteUser(this.props.users, data.target.id)
            )
          }
          {...this.props}
        />
      </div>
    );
  }
}

const UserCheckerWithData = ({ ...props }) => (
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
      return (
        <UserChecker
          data={data ? data.users : ""}
          loading={loading}
          error={error}
          {...props}
        />
      );
    }}
  </Query>
);

export default UserCheckerWithData;
