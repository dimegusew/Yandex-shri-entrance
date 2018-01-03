import React, { Component } from 'react';
import Room from './Room.js'
import RoomEventDiagram from './RoomEventDiagram';
import './Floor.css';

class Floor extends Component {

  eventsHandler(data,roomId){
    return data.filter((el)=>el.room.id==roomId)
  }

  render() {
    return (
      <div className="floor">
        <p>{this.props.floorNumber+' ЭТАЖ'}</p>
        <div>{this.props.rooms.map((el)=>
        <RoomEventDiagram room={el} events={this.eventsHandler(this.props.events,el.id)}/>
      )} </div>

    </div>
    );
  }
}

export default Floor;
