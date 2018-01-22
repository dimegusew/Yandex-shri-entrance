import React, { Component } from "react";
import "./EventDeleteWindow.css";
import newEmoji from "./images/emoji1.svg";

class EventDeleteWindow extends Component {
  onClick = event => {
    event.target.id;
    this.props.eventDeleteWindowHandler(event.target.id);
  };

  render() {
    return (
      <div className="evet-delete-window">
        <div>
          <img src={newEmoji} />
          <h4>Встреча будет удалена безвозвратно</h4>
          <p>
            <button id="cancel" onClick={this.onClick}>
              Отмена
            </button>

            <button id="delete" onClick={this.onClick}>
              Удалить
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default EventDeleteWindow;
