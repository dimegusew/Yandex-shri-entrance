import React from "react";
import WithLoading from "../HOC/AddLoader.js";

const DropDownItem = ({ el, onClick }) => {
  return (
    <div className="dropdown-item" onMouseDown={onClick} id={el.login}>
      <img alt={"user-avatar"} src={el.avatarUrl} />
      {el.login}
      <div>{`·${el.homeFloor} этаж`} </div>
    </div>
  );
};

const DropDownItems = ({ input, choosedUsers, users, ...props }) => {
  const logins = choosedUsers.map(el => (el ? el : ""));
  return (
    <div className="dropdown">
      {users
        .filter(
          el =>
            el.login.indexOf(input) !== -1 && logins.indexOf(el.login) === -1
        )
        .map(el => <DropDownItem el={el} key={el.id} {...props} />)}{" "}
    </div>
  );
};

const DropDown = ({ input, ...props }) => {
  return <DropDownItems input={input} {...props} />;
};

export default WithLoading(DropDown);
