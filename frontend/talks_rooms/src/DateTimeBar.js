import React, { Component } from 'react';
import './DateTimeBar.css'
import Date from './DateBar.js'
import Time from './TimeBar.js'

class DateTimeBar extends Component {
  render() {
    return (
      <div className="date-time-bar">
        <Date/>
        <Time/>
    </div>
    );
  }
}

export default DateTimeBar;
