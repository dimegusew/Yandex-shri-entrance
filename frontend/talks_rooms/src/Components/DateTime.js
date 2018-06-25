import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import InputWithName from "./Input.js";
import DatePickerWithName from "./MyDatePicker.js";

class DateTime extends Component {
  state = {
    dateTime: {
      date: moment(),
      time: {
        start: moment().format("LT"),
        end: moment()
          .add(30, "minutes")
          .format("LT")
      }
    }
  };

  validateTime=(dat)=>{
    return (dat.target.value.length<6)&& +dat.target.value.slice(0,1)<24 ? true : false
  }

  addColon = (dat)=>{
    return dat.length==2 && dat.indexOf(":")==-1 ? dat+':' : dat
  }



  render() {
    const { dateTime } = this.props;
    return (
      <div className="date-time-input">
        <DatePickerWithName
          {...this.props}
          className="date-input"
          name="Дата"
          dateTime={dateTime}
          onChange={date => {
            this.props.changeDate({ ...dateTime, date });
          }}
        />

        <InputWithName
          className="time-input"
          name="Начало"
          value={dateTime.time.start}
          onChange={dat => {

            this.validateTime(dat)&&
            this.props.changeDate({
              ...dateTime,
              time: {
                ...dateTime.time,
                start: this.addColon(dat.target.value)
              }
            });
          }}
        />
        <InputWithName
          className="time-input"
          name="Конец"
          pattern='[0-9]{,3}'
          value={dateTime.time.end}
          onChange={dat => {
            (this.validateTime(dat)) && //change to validate method
            this.props.changeDate({
              ...dateTime,
              time: {
                ...dateTime.time,
                end: this.addColon(dat.target.value)
              }
            })
          }}
        />
      </div>
    );
  }
}

export default DateTime;
