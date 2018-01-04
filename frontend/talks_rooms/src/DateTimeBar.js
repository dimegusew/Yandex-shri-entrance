import React, { Component } from 'react';
import './DateTimeBar.css'
import DateBar from './DateBar.js'
import TimeBar from './TimeBar.js'

class DateTimeBar extends Component {

  choosingDate=(date)=>
    this.props.choosingDate(date)

  render() {
    return (
      <div className="date-time-bar">
        <DateBar choosingDate={this.choosingDate} currentDate={this.currentDate}/>
        <TimeBar/>
    </div>
    );
  }
}

export default DateTimeBar;
