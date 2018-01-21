import React, { Component } from "react";
import "./TimeBar.css";
import CurrentTime from "./CurrentTime";
import converterDate from "./functions/convertDate.js";

function Hours({ choosingDate, currentTime }) {
  let currentDate = new Date();
  let convertedCurrent = converterDate(currentDate).fullDate;
  let convertedChoosing = converterDate(choosingDate).fullDate;

  var rows = [];
  let myStyle = { color: " #858E98" };
  for (let i = 8; i < 24; i++) {
    myStyle =
      convertedCurrent < convertedChoosing
        ? { color: " black" }
        : convertedCurrent == convertedChoosing && i > currentTime
          ? { color: " black" }
          : { color: " #858E98" };
    rows.push(
      <div key={i}>
        <div className="hour" style={myStyle}>
          {i}
        </div>
        <div className="hour-line" />
      </div>
    );
  }
  return rows;
}

class TimeBar extends Component {
  constructor(props) {
    let date = new Date();
    super(props);
    this.state = {
      currentHour: date.getHours()
    };
  }

  currentTime = time => {
    this.setState({
      currentHour: time.getHours()
    });
  };

  render() {
    return (
      <div className="time-bar">
        <div className="percent-container">
          <CurrentTime
            currentTime={this.currentTime}
            choosingDate={this.props.choosingDate}
          />
        </div>
        <div className="time-line">
          <Hours
            choosingDate={this.props.choosingDate}
            currentTime={this.state.currentHour}
          />
        </div>
      </div>
    );
  }
}

export default TimeBar;
