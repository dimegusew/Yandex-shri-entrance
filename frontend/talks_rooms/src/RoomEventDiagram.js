import React, { Component } from "react";
import Room from "./Room";
import EventDiagram from "./EventDiagram";
import "./RoomEventDiagram.css";

class RoomEventDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomEnabled: false,
      roomHovered: false
    };
  }

  roomEnabled = ev => {
    this.setState({
      roomEnabled: ev
    });
  };

  roomHovered = ev =>
    this.setState({
      roomHovered: ev
    });

  render() {
    return (
      <div className="room-event-diagram">
        <Room
          name={this.props.room.title}
          capacity={this.props.room.capacity}
          enabled={this.state.roomEnabled}
          hovered={this.state.roomHovered}
        />
        <EventDiagram
          events={this.props.events}
          roomEnabled={this.roomEnabled}
          roomHovered={this.roomHovered}
          timeToNewEvent={this.props.timeToNewEvent}
          id={this.props.room.id}
          eventEditHandler={this.props.eventEditHandler}
        />
      </div>
    );
  }
}
export default RoomEventDiagram;
