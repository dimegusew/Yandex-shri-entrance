import React from "react";

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

const UserList = ({ ...props,choosedUsers }) => {
  return (
    <div className="user-list">
      {choosedUsers.map(el => <User {...el} key={el.id} {...props} />)}
    </div>
  );
};

export default UserList;
