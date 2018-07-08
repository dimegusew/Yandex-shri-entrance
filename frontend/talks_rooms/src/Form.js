import React from "react";
import "./App.css";
import DateTime from "./Components/DateTime.js";
import UserChoose from "./Components/UserChoose.js";
import Header from "./Components/Header.js";
import RoomChoose from "./Components/RoomChoose.js";
import ThemeInput from "./Components/ThemeInput.js";

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
