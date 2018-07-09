import React from "react";
import "./App.css";
import DateTime from "./Containers/DateTime.js";
import UserChoose from "./Containers/UserChoose.js";
import Header from "./Components/Header.js";
import RoomChoose from "./Containers/RoomChoose.js";
import ThemeInput from "./Containers/ThemeInput.js";

const Form = () => {
  return (
    <div className="form">
      <Header />
      <ThemeInput />
      <DateTime />
      <UserChoose />
      <RoomChoose />
    </div>
  );
};

export default Form;
