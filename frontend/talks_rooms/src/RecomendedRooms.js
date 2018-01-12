import React, { Component } from 'react';
import './RecomendedRooms.css';
import getRecommendation from './getRecomendation.js'

class RecomendedRoom extends Component {
  constructor(props){
    super(props)
    this.state={
      isChoosed : this.props.roomIsChoosed ? true : false
    }
  }

  onClickHandler=()=>{
    !this.props.roomIsChoosed ?
    this.setState({
      isChoosed : !this.state.isChoosed
    })
    //this.props.onClick()
    : ""
    //this.props.onClick()
  }

  convertDate=(time)=>{
    let spltTime=time.split("T")[1].split(":")
    console.log(spltTime)
    return spltTime[0]+":"+spltTime[1]
  }


  render() {
    console.log(this.state.isChoosed)
    let myStyle= this.state.isChoosed ?{"color": "white","backgroundColor":"#007DFF" } : {}
    return (
      <div className="recomended-room" style={myStyle} onClick={this.onClickHandler}>
        {this.props.roomIsChoosed ?
          <div onClick={this.props.changeRoomtoRecomendations}>"X"
          </div>
          : ""}
        <div id={this.props.id}>
          <span >{this.convertDate(this.props.date.start)} – {this.convertDate(this.props.date.end)}</span>
           {this.props.title} · {this.props.floor + " этаж"}

         </div>
       </div>
    );
  }
}





class RecomendedRooms extends Component {
  constructor(props){
    super(props)
    this.state={
      roomIsChoosed: true
    }
  }

  clickHandler=(el)=>{
    console.log(el.target.id)
    let choosedRoom = this.props.db.rooms.filter((room)=>room.title===el.target.id)
    this.props.choosingRoom(choosedRoom) //callback to mainBody
  }

  changeRoomtoRecomendations=()=>{
    this.setState({roomIsChoosed : false})
  }

  render() {
    let recomendedRooms=getRecommendation(this.props.time,this.props.db,this.props.members)
    let choosedFromMainPageRoom = this.props.db.rooms.filter((el)=>el.id===this.props.roomToNewEvent)
    console.log(choosedFromMainPageRoom)
    return (
      <div className="recomendation-field">
        <p>{!this.state.roomIsChoosed? "Рекомендованные переговорки": "Ваша переговорка"}</p>
        {this.state.roomIsChoosed ?
          <RecomendedRoom
            title={choosedFromMainPageRoom[0].title}
            floor={choosedFromMainPageRoom[0].floor}
            date={this.props.time}
            onClick={this.props.roomHandler}
            id={this.props.roomToNewEvent}
            roomIsChoosed ={this.state.roomIsChoosed}
            changeRoomtoRecomendations={this.changeRoomtoRecomendations}
          />
          :
           recomendedRooms.map((el)=>
          <RecomendedRoom
            title={el.room.title}
            floor={el.room.floor}
            date={el.date}
            onClick={this.props.roomHandler}
            id={el.room.id}
          />
          )}
      </div>
    );
  }
}

export default RecomendedRooms
