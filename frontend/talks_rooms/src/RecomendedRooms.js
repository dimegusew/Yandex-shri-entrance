import React, { Component } from 'react';
import './RecomendedRooms.css';
import getRecommendation from './getRecomendation.js'

class RecomendedRoom extends Component {

  convertDate=(time)=>{
    let spltTime=time.split("T")[1].split(":")
    console.log(spltTime)
    return spltTime[0]+":"+spltTime[1]
  }

  render() {
    return (
      <div className="recomended-room" onClick={this.props.onClick}>
        <div id={this.props.id}>
          <span >{this.convertDate(this.props.date.start)} – {this.convertDate(this.props.date.end)}</span>
           {this.props.title} · {this.props.floor + " этаж"}
         </div>
       </div>
    );
  }
}





class RecomendedRooms extends Component {

  clickHandler=(el)=>{
    console.log(el.target.id)
    let choosedRoom = this.props.db.rooms.filter((room)=>room.title===el.target.id)
    //this.props.choosingRoom(choosedRoom) //callback to mainBodyEvent
  }

  render() {
    console.log(getRecommendation(this.props.time,this.props.db,this.props.members))
    let recomendedRooms=getRecommendation(this.props.time,this.props.db,this.props.members)

    return (
      <div className="recomendation-field">
        <p>Рекомендованные переговорки</p>
        {recomendedRooms.map((el)=>
          <RecomendedRoom
            title={el.room.title}
            floor={el.room.floor}
            date={el.date}
            onClick={this.clickHandler}
            id={el.room.title}

          />
          )}
      </div>
    );
  }
}

export default RecomendedRooms
