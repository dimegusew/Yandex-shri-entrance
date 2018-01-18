import React, { Component } from 'react';
import './DateTimeBar.css'
import DateBar from './DateBar.js'
import TimeBar from './TimeBar.js';
import convertDate from './functions/convertDate.js'

class DateTimeBar extends Component {
  constructor(props){
    let date=new Date();
    super(props)
    this.state={
      choosingDate : date
    }
  }

  choosingDate=(date)=>
    {this.props.choosingDate(convertDate(date).fullDate)
      this.setState({
        choosingDate : date
      })}



  render() {
    return (
      <div className="date-time-bar">
        <DateBar choosingDate={this.choosingDate} currentDate={this.currentDate}/>
        <TimeBar choosingDate={this.state.choosingDate}/>
    </div>
    );
  }
}

export default DateTimeBar;
