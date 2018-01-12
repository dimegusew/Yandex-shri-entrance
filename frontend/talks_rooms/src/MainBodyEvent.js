import React, { Component } from 'react';
import './MainBodyEvent.css';
import InputField from  './InputField';
import UsersInEvent from "./UsersInEvent";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import close from './images/close.svg'
import Cleave from 'cleave.js/react';
import RecomendedRooms from './RecomendedRooms.js'


class Users extends Component {

  eventHandler=(el)=>{
    this.props.choosedUser(el.target.id)
  }

  render() {
  let users=this.props.users;
    return (
      <div className="user-select">

        {users.map((el)=>
          <div className="user-in-user-select" id={el.id} onClick={this.eventHandler} >
            <img id={el.id} src={el.avatarUrl} className="user-img"/>
            <div id={el.id} >{el.login} .
              <span>{el.homeFloor + " этаж"}</span>
              </div>
          </div>
        )}
     </div>
    );
  }
}


class MainBodyEvent extends Component {
  constructor(props){
    super(props)
    this.state={
      choosedUsersId:[],
      addedUsers : [],
      EventTitle : "",
      viewedUsers : this.props.users,
      timeStart : this.props.timeToNewEvent.start,
      timeEnd : this.props.timeToNewEvent.end,
      date : "",
      titleValid : false,
      timeStartValid : this.props.timeToNewEvent.start ? true : false,
      timeEndValid : this.props.timeToNewEvent.end ? true : false,
      dateValid : this.props.dateToNewEvent ? true : false
    }
  }


    choosedUser=(user)=>{
      let choosedUsers=this.state.choosedUsersId.slice(0);
      (choosedUsers.indexOf(user)==-1) ? choosedUsers.push(user) : ""
      let addedUsers= this.props.users ? this.props.users.filter((el)=>choosedUsers.indexOf(el.id)!=-1) : "" ;
      this.setState({
        choosedUsersId : choosedUsers,
        addedUsers : addedUsers,                         //calback from users
      })
      this.props.addedUsersHandler(addedUsers);

    }

    removedUser=(user)=>{
      let addedUsers = this.state.addedUsers;
      let choosedUsersId=this.state.choosedUsersId;

      let index = choosedUsersId.indexOf(user);
      choosedUsersId.splice(index,1)

      let remainingUsers=addedUsers.filter((el)=>el.id!=user)
      console.log(choosedUsersId)
      this.setState({
          addedUsers : remainingUsers,
      })

    }

  onInputHandler=(change)=>{
    console.log(change.target.value)
    switch(change.target.id){
      case "title" :
        change.target.value ?
         this.setState({
           EventTitle : change.target.value,
         }) :
         this.setState({
           titleValid : false,
         })

         this.props.addedTitleHandler(change.target.value)
         break;

      case "users" :
        let viewedUsers;
        viewedUsers=this.props.users.filter((el)=>
            el.login.indexOf(change.target.value)!=-1);
        this.setState({
          viewedUsers : viewedUsers
        })
        break;

      case "time-start":
        let timeStart= change.target.value;
        (timeStart.split("").length == 5) ?
          this.setState({
            timeStart : (timeStart),
            timeStartValid : true
          }) :
          this.setState({
            timeStartValid : false
          })
      break;

      case "time-end":
        let timeEnd= change.target.value;
        (timeEnd.split("").length == 5) ?
          this.setState({
            timeEnd : (timeEnd),
            timeEndValid : true,
          }) :
          this.setState({
            timeEndValid : false
          })

          //add error when timeEnd<timeStart
      break;
    }
  }


  dateHandler=(date)=>{
    if (date){
      let year= date.getFullYear();
      let month= (date.getMonth()+1);
      let day = date.getDate()

      this.setState({date:(year+"-"+(month<10 ? ("0"+month) : month)+"-"+(day<10 ? ("0"+day) : day)),
                      dateValid:true})
    }
  }


  render() {
console.log(this.props.roomToNewEvent)

    return (
      <div className="event-edit-container">
        <div className="event-edit">
            <div className="left-side">
              <h3>{"Новая встреча"}</h3>
              <InputField title={"Тема"} placeholder={"О чем будете говорить?"}
                  onChange={this.onInputHandler}
                  id={"title"}
                  type={"text"}
                  width={"409px"}
              />
              <InputField title={"Участники"} placeholder={"Например"}
                onChange={this.onInputHandler}
                id ={"users"}
                type={"text"}
                width={"409px"}
                >
                  <Users
                     users={this.state.viewedUsers}
                     className="list"
                     choosedUser={this.choosedUser}
                   />
              </InputField>

              <UsersInEvent
                addedUsers={this.state.addedUsers}
                removedUser={this.removedUser}
              />
              </div>
  <div className="left-side">
    <h3>
      <div className="big-close-button">
        <img src={close} />
       </div>
    </h3>
    <div className="date-time-input">


    <InputField title={"Дата"} placeholder={"Дата"}
        onChange={this.dateHandler}
        id={"date"}
        type={"date"}
        width={"228px"}
        value={this.props.dateToNewEvent}
    />
    <InputField title={"Начало"} placeholder={"Время"}
        onChange={this.onInputHandler}
        id={"time-start"}
        type={"time"}
        width={"60px"}
        value={this.state.timeStart}
    />
    <div className="dash">–</div>
    <InputField title={"Конец"} placeholder={"Время"}
        onChange={this.onInputHandler}
        id={"time-end"}
        type={"time"}
        width={"60px"}
        value={this.state.timeEnd}
    />
  </div>
  {this.state.timeStartValid
    && this.state.timeEndValid
    && this.state.dateValid ?

    <RecomendedRooms
      roomToNewEvent={this.props.roomToNewEvent}
      roomHandler={this.props.roomHandler}
      db={{"rooms":this.props.rooms,"events":this.props.events}}
      members= {this.state.addedUsers}
      time={{"start": this.state.date+("T"+this.state.timeStart+":00.981Z"), "end": this.state.date+ ("T"+this.state.timeEnd+":00.981Z")}}
    />
 : ""}

</div>
</div>
</div>
    );
  }
}


  export default MainBodyEvent;
