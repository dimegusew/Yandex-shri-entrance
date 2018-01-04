import React, { Component } from 'react';
import './DateBar.css'
import arrowR from './images/arrow.svg'
import arrowL from './images/arrow2.svg'
import ArrowButton from './ArrowButton';
import DayPicker from 'react-day-picker';
import './ModuleCalendar.css';

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
      this.props.choosingDate(this.convertDate(choosedDate).fullDate)
    };

   convertDate(date){
    return {"day" : date.getDate(),
            "mounth": date.getMonth()+1,
            "year" : date.getFullYear(),
            "fullDate" :
            `${date.getFullYear()}/${date.getMonth()+1<10
               ? ("0"+(date.getMonth()+1)):date.getMonth()+1}/${date.getDate()<10
                  ? "0"+date.getDate():date.getDate() }`
   }
 }


 handleClick=(ev)=>
 {
   console.log(ev.target.className)
   let minusOrPlus= (ev.target.className=="minusButton") ? -1 : 1;
   let choosingDate= this.convertDate(this.state.selectedDay).fullDate.split('/')
   let changedDate=new Date(new Date(parseInt(choosingDate[0],10),
                    parseInt(choosingDate[1],10)-1,
                    parseInt(choosingDate[2],10)+minusOrPlus));
   this.setState({
     selectedDay : changedDate
   })
   this.props.choosingDate(this.convertDate(changedDate).fullDate)
 }


  render() {
    let selectedDate=this.convertDate(this.state.selectedDay);
    let currentDate=this.convertDate(new Date());

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
        <button className="minusButton" onClick={this.handleClick}>
          <img src={arrowL}/>
        </button>
        <p onClick={this.eventHandler}
          style={myStyle}>

           {selectedDate.day + " " + MONTHS_short[selectedDate.mounth-1]}
           {selectedDate.fullDate==currentDate.fullDate ?
          " ⋅ Сегодня" : ""}
        </p>

        <button className="plusButton" onClick={this.handleClick}>
          <img src={arrowR}/>
        </button>


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
