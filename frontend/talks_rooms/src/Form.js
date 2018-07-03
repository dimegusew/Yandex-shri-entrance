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
import ThemeInput from "./Components/ThemeInput.js";



class Form extends Component {
  state = {
    dateTime: {date:moment(),
                 time: {start:moment().format('LT'),
                         end:moment().add(30, 'minutes').format('LT') }},
    theme: "",
    choosedUsers: [],
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
        <ThemeInput/>

        <DateTime
          changeDate={data => this.setState({
            dateTime: {...data},
            isValid:{...isValid,
              dateTime :
              data.date && data.time.start && data.time.end  ? true : false} })}
          {...this.state}
         />
        <UserChecker
          userChoose={data => this.setState({choosedUsers: [...data],
            isValid:{...isValid,choosedUsers : data.length!==0 ? true : false}})}
          {...this.state}
        />

      <RoomChecker {...this.state}/>
      </div>
    );
  }
}

export default Form;
