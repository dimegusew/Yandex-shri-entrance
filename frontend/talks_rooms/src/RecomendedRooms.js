import React, { Component } from "react";
import "./RecomendedRooms.css";
import getRecommendation from "./functions/getRecomendation.js";
import close from './images/close.svg'

class RecomendedRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChoosed: this.props.roomChoosedFromMainPage ? true : false
    };
  }

  componentDidMount() {
    this.props.roomChoosedFromMainPage ? this.props.onClick(this.props.id) : "";
  }

  onClickHandler = event => {
    if (!this.props.roomChoosedFromMainPage) {
      this.setState({
        isChoosed: !this.state.isChoosed
      });
      this.props.onClick(this.props.id);
    }
  };

  convertDate = time => {
    let spltTime = time.split("T")[1].split(":");
    return spltTime[0] + ":" + spltTime[1];
  };

  onCancelRoom = () => {
    this.props.cancelRoom();
  };

  render() {
    let myStyle = this.props.choosedRoom
      ? { color: "white", backgroundColor: "#007DFF" }
      : {};
    return (
      <div
        className="recomended-room"
        style={myStyle}
        onClick={this.onClickHandler}
      >
        <div id={this.props.id}>
          <span>
            {this.convertDate(this.props.date.start)} –{" "}
            {this.convertDate(this.props.date.end)}
          </span>
          <span>
          {this.props.title} · {this.props.floor + " этаж"}
        </span>
          {this.props.roomIsChoosed ? (
            <span onClick={this.onCancelRoom}><img src={close}/></span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class RecomendedRooms extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.roomToEdit)
    this.state = {
      roomIsChoosed: this.props.roomToNewEvent || this.props.roomToEdit ? true : false,
      choosingRoomId: null
    };
  }

  clickHandler = el => {
    let choosedRoom = this.props.db.rooms.filter(
      room => room.title === el.target.id
    );
    this.props.choosingRoom(choosedRoom); //callback to mainBody
  };

  onClick = roomId => {
    let recomendedRooms = getRecommendation(
      this.props.time,
      this.props.db,
      this.props.members
    );
        console.log("roomSwap")

    let roomSwap=recomendedRooms[0].roomSwap
    console.log(roomSwap)
    this.setState({
      choosingRoomId: roomId,
      roomSwap: roomSwap
    });

    this.props.roomHandler(roomId,roomSwap);
  };

  cancelRoom = () => {
    this.setState({
      roomIsChoosed: false,
      choosingRoomId: null
    });
  };
  componentDidUnmount=()=>{
    this.setState({
      roomIsChoosed: false
    });
  };

  render() {
    console.log()
    console.log("is choosed from main")
    let recomendedRooms = getRecommendation(
      this.props.time,
      this.props.db,
      this.props.members
    );


    let choosedFromMainPageRoom = this.props.db.rooms.filter(
      el => el.id === this.props.roomToNewEvent
    );

    let editedRoom = this.props.roomToEdit ? this.props.db.rooms.filter(
      el => el.id === this.props.roomToEdit.id ) : {};

    let roomToEdit=editedRoom[0]

    return (
      <div className="recomendation-field">
        <p>
          {!this.state.roomIsChoosed
            ? "Рекомендованные переговорки"
            : "Ваша переговорка"}
        </p>
        {this.state.roomIsChoosed ? (
          <RecomendedRoom
            title={this.props.roomToEdit? roomToEdit.title : choosedFromMainPageRoom[0].title }
            floor={this.props.roomToEdit? roomToEdit.floor :choosedFromMainPageRoom[0].floor}
            date={this.props.time}
            onClick={this.onClick}
            id={this.props.roomToEdit? roomToEdit.id : choosedFromMainPageRoom[0].id}
            roomChoosedFromMainPage={this.state.roomIsChoosed}
            choosedRoom={this.state.roomIsChoosed}
            cancelRoom={this.cancelRoom}
            roomIsChoosed={this.state.roomIsChoosed}
          />
        ) : (
          recomendedRooms.map(el => (
            <RecomendedRoom
              title={el.room.title}
              floor={el.room.floor}
              date={el.date}
              onClick={this.onClick}
              id={el.room.id}
              choosedRoom={el.room.id === this.state.choosingRoomId}
            />
          ))
        )}
      </div>
    );
  }
}

export default RecomendedRooms;
