import React, { Component } from "react";
import "./App.css";
import "moment/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import DateTime from "./Components/DateTime.js";
import UserChecker from "./Components/Userchecker.js";
import { InputWithClearButton } from "./Components/Input.js";
import Header from "./Components/Header.js";
import moment from 'moment';
import RoomChecker from "./Components/RoomChecker.js";

class Form extends Component {
  state = {
    dateTime: {date:moment(),
                 time: {start:moment().format('LT'),
                         end:moment().add(30, 'minutes').format('LT') }},
    theme: "",
    users: [],
    isValid:{
      theme: false,
      dateTime:true,
      users:false
    }
  };


  render() {
    let {isValid} = this.state;
    console.log(this.state)
    return (
      <div className="form">
        <Header />
        <InputWithClearButton
          name="Тема"
          placeholder={"О чем будете говорить?"}
          className="text-input"
          onChange={data =>this.setState({
            theme: data.target.value,
            isValid:{...isValid,
              theme : data.target.value ? true : false}})}
          onClear={()=> this.setState({theme: "",isValid:{...isValid,theme:false}})}
          {...this.state}
        />
        <DateTime
          changeDate={data => this.setState({
            dateTime: {...data},
            isValid:{...isValid,
              dateTime :
              data.date && data.time.start && data.time.end  ? true : false} })}
          {...this.state}
         />
        <UserChecker
          userChoose={data => this.setState({users: [...data],
            isValid:{...isValid,users : data.length!==0 ? true : false}})}
          {...this.state}
        />

      <RoomChecker {...this.state}/>
      </div>
    );
  }
}

export default Form;
