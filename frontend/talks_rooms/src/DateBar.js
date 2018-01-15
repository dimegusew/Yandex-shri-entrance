import React, { Component } from 'react';
import './DateBar.css'
import arrowR from './images/arrow.svg'
import arrowL from './images/arrow2.svg'
import ArrowButton from './ArrowButton';
import DayPicker from 'react-day-picker';
import './ModuleCalendar.css';
import converterDate from './convertDate.js'




class DateBar extends Component {
  constructor(props){
    let currTime=new Date();
    super(props);
    this.state={
      isClicked :false,
      selectedDay: currTime
    }
  }

  eventHandler=()=>
      this.setState({
        isClicked : !this.state.isClicked,
      })

    handleDayClick=(day, { selected })=>
      {this.setState({
        selectedDay: selected ? this.state.selectedDay : day,
      })
      let choosedDate=selected ? this.state.selectedDay : day;
      this.props.choosingDate(choosedDate)
    };



 handleButtonClick=(ev)=>
 {
   console.log(ev.target.className)
   let minusOrPlus= (ev.target.className=="minusButton") ? -1 : 1;
   let choosingDate= converterDate(this.state.selectedDay).fullDate.split('/')
   let changedDate=new Date(new Date(parseInt(choosingDate[0],10),
                    parseInt(choosingDate[1],10)-1,
                    parseInt(choosingDate[2],10)+minusOrPlus));
   this.setState({
     selectedDay : changedDate
   })
   this.props.choosingDate(changedDate)
 }


  render() {
    let width=document.documentElement.clientWidth;
    let numberOfMonth=width<600 ? 1 : 3;
    let selectedDate=converterDate(this.state.selectedDay);
    let currentDate=converterDate(new Date());

    const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};
    const MONTHS = {
      ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ]};

      const MONTHS_short =
        [
          'янв',
          'фев',
          'март',
          'апр',
          'май',
          'июнь',
          'июль',
          'авг',
          'сент',
          'окт',
          'нояб',
          'дек',
        ];


      const FIRST_DAY_OF_WEEK = {
        ru: 1
      };

      const WEEKDAYS_LONG = {
        ru: [
          'Воскресенье',
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота',
        ]}
    const locale="ru";
    let myStyle= this.state.isClicked ?
    {"color": "#0070E0"}
    : {"color": "#000000"}


    return (
      <div className="date-bar">
        <button className="minusButton" onClick={this.handleButtonClick}>
          <img src={arrowL}/>
        </button>
        <p onClick={this.eventHandler}
          style={myStyle}>

           {selectedDate.day + " " + MONTHS_short[selectedDate.mounth-1]}
           {selectedDate.fullDate==currentDate.fullDate ?
          " ⋅ Сегодня" : ""}
        </p>

        <button className="plusButton" onClick={this.handleButtonClick}>
          <img src={arrowR}/>
        </button>


        {this.state.isClicked ?
          <span className="calendar">
            <DayPicker
              className="calendar-mounth"
              canChangeMonth={false}
              numberOfMonths={numberOfMonth}
              months={MONTHS[locale]}
              weekdaysLong={WEEKDAYS_LONG[locale]}
              weekdaysShort={WEEKDAYS_SHORT[locale]}
              firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
          />
          </span>
          :
          ""
        }
    </div>
    );
  }
}

export default DateBar;
