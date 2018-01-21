import React, { Component } from "react";
import "./UsersInEvent.css";
import close from "./images/close.svg";

class User extends Component {
  render() {
    return (
      <div className="user-in-event">
        <img src={this.props.img} className="avatar" />
        <div>{this.props.login}</div>
        <a>
          <img
            src={close}
            className="close"
            id={this.props.id}
            onClick={this.props.removedUser}
          />
        </a>
      </div>
    );
  }
}

class UsersInEvent extends Component {

  removedUser = userToRemove => {
    this.props.removedUser(userToRemove.target.id);
  };

  render() {
    return (
      <div className="users-in-event">
        {this.props.addedUsers.map(el => (
          <User
            img={el.avatarUrl}
            login={el.login}
            key={el.id}
            id={el.id}
            removedUser={this.removedUser}
          />
        ))}
      </div>
    );
  }
}

export default UsersInEvent;
