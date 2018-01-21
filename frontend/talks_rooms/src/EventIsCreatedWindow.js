import React, { Component } from "react";
import "./EventIsCreatedWindow.css";
import converter from "./functions/converterFromServerTime.js";
import newEmoji from "./images/emoji2.svg";

class EventIsCreatedWindow extends Component {
  render() {
    this.props.dataToEventsCreatedWindow;
    let data = this.props.dataToEventsCreatedWindow;
    let dateStart = data.date.dateStart;
    let dateEnd = data.date.dateEnd;
    let room = data.room.title;
    return (
      <div className="evet-created-window">
        <div>
          <span className={"congrad"}>
            <img src={newEmoji} />
          </span>
          <h4>Встреча создана</h4>
          <p>
            {converter(dateStart).date}, {converter(dateStart).time} -{" "}
            {converter(dateEnd).time}
          </p>
          <p>
            {data.room.title} · {data.room.floor + " этаж"}
          </p>
          <button onClick={this.props.onClick}>Хорошо</button>
        </div>
      </div>
    );
  }
}

export default EventIsCreatedWindow;
