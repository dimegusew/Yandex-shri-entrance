import React, { Component } from 'react';
import './TimeBar.css'
import CurrentTime from "./CurrentTime"

function Hours() {
    var rows = [];
    for (var i = 8; i <24; i++) {
        rows.push(
          <div>
            <div className='hour'>{i}</div>
            <div className='hour-line'></div>
          </div>
          );
    }
  return rows;
}



class TimeBar extends Component {
  render() {
    return (
      <div className="time-bar">
        <div className="percent-container">
          <CurrentTime/>
        </div>
      <div className='time-line'>
        <Hours/>
      </div>
    </div>
    );
  }
}

export default TimeBar;
