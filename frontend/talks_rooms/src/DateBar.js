import React, { Component } from 'react';
import './DateBar.css'
import arrowR from './images/arrow.svg'
import arrowl from './images/arrow2.svg'
import ArrowButton from './ArrowButton';
import DayPicker from 'react-day-picker';
import './ModuleCalendar.css';

class DateBar extends Component {
  constructor(props){
    super(props);
    this.state={
      isClicked :false,
      selectedDay: null
    }
  }

  eventHandler=()=>
      this.setState({
        isClicked : !this.state.isClicked,
      })

    handleDayClick=(day, { selected })=>
    {this.setState({
      selectedDay: selected ? undefined : day,
    })
  };

  render() {
    let currTime=new Date();
    let choosingDate=this.state.selectedDay ? this.state.selectedDay.toLocaleDateString()
    : currTime.toLocaleDateString();
        //console.log(currTime.toLocaleDateString())
        //console.log(choosingDate==currTime.toLocaleDateString())

    let time = choosingDate.split("/")
    let mounth = time[0];
    let day = time[1];
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
        <ArrowButton arrow={arrowl}/>
        <p onClick={this.eventHandler}
          style={myStyle}>

          {day + " " + MONTHS_short[mounth-1]}
          {choosingDate==currTime.toLocaleDateString() ?
          " ⋅ Сегодня" : ""}
        </p>

        <ArrowButton arrow={arrowR}/>

        {this.state.isClicked ?
          <span className="calendar">
            <DayPicker
              className="calendar-mounth"
              canChangeMonth={false}
              numberOfMonths={3}
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
