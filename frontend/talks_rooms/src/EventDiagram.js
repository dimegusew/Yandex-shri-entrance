import React, { Component } from "react";
import "./EventDiagram.css";
import LittleEventEditButton from "./LittleEventEditButton.js";

class Tooltip extends Component {
  convertDateTime(date) {
    let splitDate = date.split("T")[0].split("-");
    let dayNumb = splitDate[2];
    let mounthNumb = splitDate[1];
    let splitTime = date.split("T")[1].split(":");
    let hour = splitTime[0];
    let minute = splitTime[1];

    let mounths = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];

    return {
      date: dayNumb + " " + mounths[mounthNumb - 1],
      time: hour + ":" + minute
    };
  }

  eventEditHandler = () => {
    let event = this.props.event;
    this.props.eventEdit(event);
  };

  render() {
    let event = this.props.event;
    let numberOfUsers = event.users.length;
    return (
      <span className="tooltiptext">
        <span>
          <h3> {event.title} </h3>
          <LittleEventEditButton onClick={this.eventEditHandler} />
        </span>
        <div className="date-room">
          {this.convertDateTime(event.dateStart).date}
          , {this.convertDateTime(event.dateStart).time}
          —{this.convertDateTime(event.dateEnd).time} ⋅ {event.room.title}
        </div>

        <div className="user">
          {numberOfUsers ? <img src={event.users[0].avatarUrl} alt={"avatar"}/> : ""}
          <span>
            {!numberOfUsers ? (
              "Нет участников"
            ) : (
              <div className="users-info">
                {event.users[0].login}
                {numberOfUsers > 1 ? (
                  <span>
                    &nbsp;{"и " +
                      (numberOfUsers - 1) +
                      " участник" +
                      (numberOfUsers === 2
                        ? ""
                        : numberOfUsers < 4 ? "а" : "ов")}
                  </span>
                ) : (
                  "  "
                )}
              </div>
            )}
          </span>
        </div>
      </span>
    );
  }
}

class Cursor extends React.Component {
  render() {
    let myStyle = {
      visibility: this.props.visibile,
      left: `${this.props.coordinate}px`
    };

    return (
      <div className="Cursor" onClick={this.props.onClick} style={myStyle}>
        +
      </div>
    );
  }
}

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isHovered: false
    };
  }

  clickHandler = events => {
    this.setState({
      isClicked: !this.props.isClicked
    });
    this.props.clicked(!this.props.isClicked);
  };

  mouseLeaveHandler = () => {
    this.setState({
      isClicked: false,
      isHovered: false
    });
    this.props.clicked(false);
  };

  mouseEnterHandler = () => {
    this.setState({
      isHovered: true
    });
  };

  convertTime(time) {
    return time
      .split("T")[1]
      .split(".")[0]
      .split(":")
      .reduce((acc, curr, i, arr) => arr[0] * 60 + parseInt(arr[1],10));
  }

  getPositionFromTime(startTime, endTime) {
    let coef = 1.1; //coordinate 1.1
    let startCoordinate = (this.convertTime(startTime) - 450) * coef;
    let stopCoordinate = (this.convertTime(endTime) - 450) * coef;
    return {
      startPosition: startCoordinate,
      duration: stopCoordinate - startCoordinate
    };
  }

  render() {
    let event = this.props.event;
    let position = this.getPositionFromTime(event.dateStart, event.dateEnd);
    let left = position.startPosition;
    let width = position.duration;
    let myStyle = {
      left: left,
      width: width
    };

    return (
      <div
        className="Event"
        style={myStyle}
        onClick={this.clickHandler}
        onMouseLeave={this.mouseLeaveHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseMove={this.props.onMouseEnter}
      >
        {this.state.isClicked ? (
          <Tooltip event={event} eventEdit={this.props.eventEditHandler} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

class EventDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xCoordinate: 0,
      visible: "hidden"
    };
  }

  clicked = ev => this.props.roomEnabled(ev);
  hovered = ev => this.props.roomHovered(ev);

  eventEnter = () => {
    this.setState({
      visible: "hidden"
    });
  };

  mouseEnter = event => {
    this.x = event.nativeEvent.offsetX;
    this.setState({
      xCoordinate: this.x,
      visible: "visible"
    });
    this.hovered(true);
  };

  mouseLeave = () => {
    this.setState({
      visible: "hidden"
    });
    this.hovered(false);
  };

  getTimeFromPosition(position) {
    let time = position * 0.909 + 480;
    let hourStart = (time / 60) ^ 0;
    let hourEnd = hourStart + 1;
    let min = parseInt((time % 60),10);
    min < 10 ? "0" + min : min;
    return {
      start:
        (hourStart < 10 ? "0" + hourStart : hourStart) +
        ":" +
        (min < 10 ? "0" + min : min),
      end:
        (hourEnd < 10 ? "0" + hourEnd : hourEnd) +
        ":" +
        (min < 10 ? "0" + min : min)
    };
  }

  onClick = event => {
    let room = event.target.id;
    let choosedTime = this.getTimeFromPosition(this.state.xCoordinate);
    this.props.timeToNewEvent(choosedTime, room);
  };

  render() {

    return (
      <div className="event-diagram" onMouseLeave={this.mouseLeave}>
        <div
          id={this.props.id}
          className="static"
          onMouseMove={this.mouseEnter}
          onClick={this.onClick}
        >
          <Cursor coordinate={this.x} visibile={this.state.visible} />
        </div>
        {this.props.events.map(el => (
          <Event
            key={el.id}
            event={el}
            clicked={this.clicked}
            onMouseEnter={this.eventEnter}
            eventEditHandler={this.props.eventEditHandler}
          />
        ))}
        <div className="add-button"> </div>
      </div>
    );
  }
}
export default EventDiagram;
