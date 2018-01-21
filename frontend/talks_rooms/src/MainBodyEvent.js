import React, { Component } from 'react';
import './MainBodyEvent.css';
import InputField from  './InputField';
import UsersInEvent from "./UsersInEvent";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import close from './images/close.svg'
import arrowRotate from './images/arrowRotate.svg'
import arrowRotateBack from './images/arrowRotateBack.svg'
import Cleave from 'cleave.js/react';
import RecomendedRooms from './RecomendedRooms.js'
import BottomBar from "./BottomBar";
import converterFromServerTime from "./functions/converterFromServerTime"
import convertDate from './functions/convertDate.js'


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
            <div id={el.id} >{el.login} ·
              &nbsp;<span>{el.homeFloor + " этаж"}</span>
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


    //let date=converterFromServerTime(this.props.eventToEdit.dateStart).date
    this.state={
      choosedUsersId:[],
      addedUsers : this.props.isEditedPage ? this.props.eventToEdit.users :  [],
      EventTitle :  this.props.isEditedPage ? this.props.eventToEdit.title : "",
      viewedUsers : this.props.users,
      timeStart :  this.props.isEditedPage ? converterFromServerTime(this.props.eventToEdit.dateStart).time
                                            : this.props.timeToNewEvent.start,
      timeEnd :  this.props.isEditedPage ? converterFromServerTime(this.props.eventToEdit.dateEnd).time
                                            : this.props.timeToNewEvent.end,
      date : this.props.isEditedPage ? converterFromServerTime(this.props.eventToEdit.dateStart).notconverted
                                            : this.props.dateToNewEvent,
      titleValid : false,
      timeStartValid : this.props.timeToNewEvent.start || this.props.isEditedPage  ? true : false,
      timeEndValid : this.props.timeToNewEvent.end || this.props.isEditedPage ? true : false,
      dateValid : this.props.dateToNewEvent || this.props.isEditedPage ? true : false,
      choosedRoom : '',
      roomToNewEvent:this.props.roomToNewEvent,
      isTitleButtonActive:false,
      isUsersButtonActive:false,
      isUsersListOpen:true
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
      this.setState({
          addedUsers : remainingUsers,
      })

    }

  onInputHandler=(change)=>{
    switch(change.target.id){
      case "title" :
         this.setState({
           EventTitle : change.target.value,
           isTitleButtonActive : change.target.value ? true:false
         })

         var title=change.target.value
         this.props.addedTitleHandler(change.target.value)
         break;

      case "users" :
        var viewedUsers;
        viewedUsers=this.props.users.filter((el)=>
            el.login.indexOf(change.target.value)!=-1);
        this.setState({
          viewedUsers : viewedUsers,
          isUsersButtonActive:change.target.value.length ? true : false
        })
        break;

      case "time-start":
        var timeStart= change.target.value;
          this.setState({
            timeStart : timeStart,
            timeStartValid : false,
            roomToNewEvent:""
          })
          if (timeStart.split("").length === 5)
          { this.setState({
                timeStartValid : true
              })
            }
            else {
              this.setState({
                timeStartValid : false
              })
            }
      break;

      case "time-end":
        var timeEnd= change.target.value;
          this.setState({
            timeEnd : timeEnd,
            timeEndValid : true,
            roomToNewEvent:""
          })

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

  roomHandler=(room,roomSwap)=>{
    this.setState({
      choosedRoom:room,
      roomSwap: roomSwap[0]
    })
    this.props.roomHandler(room)
  }


closedButtonHandler=()=>{
  this.props.cancelHandler()
}


titleButtonHandler=()=>{
  this.setState({
   EventTitle : "",
   isTitleButtonActive : false
  })
}

usersButtonHandler=()=>{
  this.setState({
   isUsersButtonActive : true,
   isUsersListOpen:!this.state.isUsersListOpen
  })
}

componentWillUpdate=()=>{
}


  render() {
    let pageWidth= document.documentElement.clientWidth;
    let currentTime=new Date();
    let time=currentTime.getHours() + ":"+ (currentTime.getMinutes()<10 ? ("0"+currentTime.getMinutes()) : currentTime.getMinutes() )
    let timeEnd=currentTime.getHours()+1 + ":"+ currentTime.getMinutes()

    let TimeStartValid = this.state.timeStart ? (this.state.timeStart.length===5) :false
    let TimeEndValid = this.state.timeEnd ? (this.state.timeEnd.length===5) :false
    let timeValid =TimeStartValid && TimeEndValid
    let titleValid=this.state.EventTitle
    let dateValid=this.state.date
    let formValid=dateValid&&titleValid&&timeValid && !!this.state.choosedRoom

    let width = document.documentElement.clientWidth
    let inputfieldWidth = width<=425 ? "320px" : "409px";
    let inputTimeFieldWidth = pageWidth<=425 ? "143px" :"60px";
    // let marginTop={"paddingTop":"139px"};

    return (
      <div>
      <div className="event-edit-container">
        {pageWidth<=425 ?
          <div className="event-edit">
            <div className="left-side">
              <h3>{this.props.isEditedPage ? "Редактирование встречи": "Новая встреча"}</h3>
              <InputField title={"Тема"} placeholder={"О чем будете говорить?"}
                  onChange={this.onInputHandler}
                  id={"title"}
                  type={"text"}
                  width={inputfieldWidth}
                  value={this.state.EventTitle}
                  img={close}
                  inputButtonHandler={this.titleButtonHandler}
                  isButtonActive={this.state.isTitleButtonActive}
              />
              <div className="date-time-input">


              <InputField title={pageWidth<425 ? "Дата и время" :"Дата"} placeholder={"Дата"}
                  onChange={this.dateHandler}
                  id={"date"}
                  type={"date"}
                  width={"198px"}
                  value={this.props.dateToNewEvent}
                  img={close}
              />
              <span>
              <InputField title={"Начало"} placeholder={`${time}`}
                  onChange={this.onInputHandler}
                  id={"time-start"}
                  type={"time"}
                  width={inputTimeFieldWidth}
                  value={this.state.timeStart}
              />
              <div className="dash">–</div>
              <InputField title={"Конец"} placeholder={`${timeEnd}`}
                  onChange={this.onInputHandler}
                  id={"time-end"}
                  type={"time"}
                  width={inputTimeFieldWidth}
                  value={this.state.timeEnd}
              />

            </span>


            </div>
            <div className="delimeter"></div>
            <div className={"user-choose"}>
            <InputField  title={"Участники"} placeholder={`Например, ${this.props.users[0].login}`}
              onChange={this.onInputHandler}
              id ={"users"}
              type={"text"}
              width={inputfieldWidth}
              img={this.state.isUsersListOpen ? arrowRotate : arrowRotateBack}
              inputButtonHandler={this.usersButtonHandler}
              isButtonActive={this.state.isUsersButtonActive}
              // onFocus={this.usersButtonHandler}
              >
                {this.state.isUsersListOpen ?
                  <Users
                     users={this.state.viewedUsers}
                     className="list"
                     choosedUser={this.choosedUser}
                   /> : "" }


            </InputField>
            <UsersInEvent
              addedUsers={this.state.addedUsers}
              removedUser={this.removedUser}
            />
          </div>
          <div className="delimeter"></div>
          {timeValid ?

            <RecomendedRooms
              roomToNewEvent={ this.state.roomToNewEvent}
              roomToEdit={ this.props.eventToEdit.room}
              roomHandler={this.roomHandler}
              db={{"rooms":this.props.rooms,"events":this.props.events}}
              members= {this.state.addedUsers}
              time={{"start": this.state.date+("T"+this.state.timeStart+":00.981Z"),
               "end": this.state.date+ ("T"+this.state.timeEnd+":00.981Z")}}
            />
         : ""}

         <BottomBar
           formValid={formValid}
           deleteIsPermitted={this.props.deleteIsPermitted}
           eventDeletedHandler={this.props.eventDeletedHandler}
           isEditedPage={this.props.isEditedPage}
           eventToEdit={this.props.eventToEdit}
           allRooms={this.props.allRooms}
           cancelHandler={this.props.cancelHandler}
           createHandler={this.props.createHandler}
           eventEditedHandler={this.props.eventEditedHandler}
           dataToServer={{
                 "dateStart": this.state.date+("T"+this.state.timeStart+":00.981Z"),
                 "dateEnd": this.state.date+ ("T"+this.state.timeEnd+":00.981Z"),
                  "room":this.state.choosedRoom,
                  "users" : this.state.addedUsers,
                 "title" :  this.state.EventTitle,
                 "roomSwap" : this.state.roomSwap }}
         />

            </div>


          </div>



           :



        <div className="event-edit">
          {/* {pageWidth ? : } */}

            <div className="left-side">
              <h3>{this.props.isEditedPage ? "Редактирование встречи": "Новая встреча"}</h3>
              <InputField title={"Тема"} placeholder={"О чем будете говорить?"}
                  onChange={this.onInputHandler}
                  id={"title"}
                  type={"text"}
                  width={inputfieldWidth}
                  value={this.state.EventTitle}
                  img={close}
                  inputButtonHandler={this.titleButtonHandler}
                  isButtonActive={this.state.isTitleButtonActive}
              />
              <div className={"user-choose"}>
              <InputField  title={"Участники"} placeholder={`Например, ${this.props.users[0].login}`}
                onChange={this.onInputHandler}
                id ={"users"}
                type={"text"}
                width={inputfieldWidth}
                img={this.state.isUsersListOpen ? arrowRotate : arrowRotateBack}
                inputButtonHandler={this.usersButtonHandler}
                isButtonActive={this.state.isUsersButtonActive}
                // onFocus={this.usersButtonHandler}
                >
                  {this.state.isUsersListOpen ?
                    <Users
                       users={this.state.viewedUsers}
                       className="list"
                       choosedUser={this.choosedUser}
                     /> : "" }


              </InputField>
              <UsersInEvent
                addedUsers={this.state.addedUsers}
                removedUser={this.removedUser}
              />
            </div>
              </div>

  <div className="left-side">
    <h4>
      <div className="big-close-button">
        <img src={close} onClick={this.closedButtonHandler}/>
       </div>
    </h4>
    <div className="date-time-input">


    <InputField title={pageWidth<425 ? "Дата и время" :"Дата"} placeholder={"Дата"}
        onChange={this.dateHandler}
        id={"date"}
        type={"date"}
        width={"198px"}
        value={this.props.dateToNewEvent}
    />
    <span>
    <InputField title={"Начало"} placeholder={`${time}`}
        onChange={this.onInputHandler}
        id={"time-start"}
        type={"time"}
        width={inputTimeFieldWidth}
        value={this.state.timeStart}
    />
    <div className="dash">–</div>
    <InputField title={"Конец"} placeholder={`${timeEnd}`}
        onChange={this.onInputHandler}
        id={"time-end"}
        type={"time"}
        width={inputTimeFieldWidth}
        value={this.state.timeEnd}
    />
  </span>

  </div>
  {timeValid ?

    <RecomendedRooms
      roomToNewEvent={ this.state.roomToNewEvent}
      roomToEdit={ this.props.eventToEdit.room}
      roomHandler={this.roomHandler}
      db={{"rooms":this.props.rooms,"events":this.props.events}}
      members= {this.state.addedUsers}
      time={{"start": this.state.date+("T"+this.state.timeStart+":00.981Z"),
       "end": this.state.date+ ("T"+this.state.timeEnd+":00.981Z")}}
    />
 : ""}

</div>
</div>
}
</div>
{pageWidth>425 ?
  <BottomBar
    isMobile = {pageWidth<=425}
  formValid={formValid}
  deleteIsPermitted={this.props.deleteIsPermitted}
  eventDeletedHandler={this.props.eventDeletedHandler}
  isEditedPage={this.props.isEditedPage}
  eventToEdit={this.props.eventToEdit}
  allRooms={this.props.allRooms}
  cancelHandler={this.props.cancelHandler}
  createHandler={this.props.createHandler}
  eventEditedHandler={this.props.eventEditedHandler}
  dataToServer={{
        "dateStart": this.state.date+("T"+this.state.timeStart+":00.981Z"),
        "dateEnd": this.state.date+ ("T"+this.state.timeEnd+":00.981Z"),
         "room":this.state.choosedRoom,
         "users" : this.state.addedUsers,
        "title" :  this.state.EventTitle,
        "roomSwap" : this.state.roomSwap }}
/>
: ""}

</div>
    );
  }
}


  export default MainBodyEvent;
