import React, { Component } from 'react';
import './Room.css';


class Room extends Component {
  onScroll(event) {

  console.log(event)
  console.log("roomevent")
}



  render() {
    let myStyle= this.props.enabled ?
        {"color":"#1D54FE"}
        : this.props.hovered ?
          {"color":"#0070E0"}
        : {"color":"#000000"};


    return (
      <div>
      <div className="room">
        <div className="name" style={myStyle}>{this.props.name}</div>
        <div className="capacity">до {this.props.capacity} человек</div>
    </div>
    <div className="back"style={myStyle}>{this.props.name}</div>
  </div>
    );
  }
}

export default Room;
