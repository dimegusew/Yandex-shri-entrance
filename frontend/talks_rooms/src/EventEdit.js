import React, { Component } from 'react';
import UpperBar from "./UpperBar.js"
import AppContainer from "./AppContainer.js"
import MainBodyEvent from "./MainBodyEvent.js"
import BottomBar from './BottomBar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { compose } from 'react-apollo';

class ServerPush extends Component {


  render() {
    return (
      ""
    );
  }
}






class EventEdit extends Component {
  constructor(props){
    super(props)
    this.state={
      membersInEvent : [],
      title : "",
      events : []
    }
  }

  createHandler=()=>{
    let splitDate=this.props.dateToNewEvent.split(".")
    let convertedDate=splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]

    console.log({"dateStart" : convertedDate+"T"+this.props.timeToNewEvent.start+":00.981Z",
    "dateEnd" : convertedDate+ "T"+this.props.timeToNewEvent.end+":00.981Z"
  })
  }


  addedUsersHandler=(users)=>{
    this.setState({
      membersInEvent : users
    })
  }

  addedTitleHandler=(title)=>{
    this.setState({
      title : title
    })
  }
  roomHandler=(room)=>{
    console.log(room.target)
    this.setState({
      room : room.target.id
    })
  }

  componentWillReceiveProps(nextProps){
    nextProps.eventsQuery.events ?
      this.setState({events : nextProps.eventsQuery.events})
      : ""
  }





  render() {

    let splitDate=this.props.dateToNewEvent.split(".")
    let convertedDate=splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]

    let date={"dateStart" : convertedDate+"T"+this.props.timeToNewEvent.start+":00.981Z",
    "dateEnd" : convertedDate+ "T"+this.props.timeToNewEvent.end+":00.981Z"}


    if (this.props.usersQuery.loading
        ||this.props.roomQuery.loading
        ||this.props.eventsQuery.loading) {
        return (<div>Loading</div>)
    }

    if (this.props.usersQuery.error
        ||this.props.roomQuery.error
        ||this.props.eventsQuery.error) {
      return (<div>An unexpected error occurred</div>)
    }

    else {
      console.log(this.props.roomToNewEvent)
    return (
          <div>
            {/* <UpperBar/> */}
            <MainBodyEvent
                users={this.props.usersQuery.users}
                rooms={this.props.roomQuery.rooms}
                events={this.state.events}
                timeToNewEvent={this.props.timeToNewEvent}
                dateToNewEvent={this.props.dateToNewEvent}
                roomToNewEvent={this.props.roomToNewEvent}
                cancelHandler={this.props.cancelHandler}
                createHandler={this.props.createHandler}
                addedUsersHandler={this.addedUsersHandler}
                addedTitleHandler={this.addedTitleHandler}
                roomHandler={this.roomHandler}
            />
            <BottomBar
              cancelHandler={this.props.cancelHandler}
              createHandler={this.createHandler}
              dataToServer={{"members" : this.state.membersInEvent,
                              "title" :this.state.title,
                              "room" : this.state.room,
                              "date" : date
                            }}


            />
          </div>
    );
  }
  }
}

const queries = {
  getUsers : gql`
  {
   users{
  	id,
    login,
    avatarUrl,
    homeFloor
  }
}
`,
  getRooms : gql`
  {
   rooms{
  	id,
    title,
    capacity,
    floor

  }
}
`,
getEvents : gql`
{
events{
id,
  dateStart,
  dateEnd,
  title,
  users {
    id
  },
  room {
    id
  }

}
}
`
}


  export default compose(graphql(queries.getUsers, {
    name : "usersQuery"
  }),
  graphql(queries.getRooms, {
      name: "roomQuery"
   }),
   graphql(queries.getEvents, {
       name: "eventsQuery"
    }),
)(EventEdit)
