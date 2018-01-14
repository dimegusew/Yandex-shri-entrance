import React, { Component } from 'react';
import './RoomList.css'
import Floor from './Floor.js'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import converterDate from "./convertDate.js"



class RoomList extends Component {
  constructor(props){
    super(props)
    console.log(this.props.data.events)
      this.state={
        filteredEvents : []
      }

  }

  roomsHandler(data){
    let floorsIds= data.map((el)=>el.floor);
    let uniqueIds = floorsIds.filter((item, pos) =>
        floorsIds.indexOf(item) == pos)

    let newRoom=[];

    for(let i of uniqueIds){
      let arr= data.filter((el)=>el.floor==i);
      let floor={}
      floor[i]=arr;
      newRoom.push(floor)
    }

    return newRoom
  }

  convertEventsDate(date){
    return date.split("T")[0].replace(/-/g,"/")
  }



componentWillReceiveProps(nextProps){
  let events=nextProps.events.slice(0);
  let filteredEvents=events.filter((el)=>this.convertEventsDate(el.dateStart)==nextProps.viewedDate)
  this.setState({
    filteredEvents : filteredEvents
  })
}



render() {

if (this.props.data.loading) {
    return (<div>Loading</div>)
}

if (this.props.data.error) {
  console.log(this.props.data.error)
  return (<div>An unexpected error occurred</div>)
}

else {
  let roomsGroupedByFloor=this.roomsHandler(this.props.data.rooms)
    return (
      <div className="event-background">
      <div className='room-list'>
        {roomsGroupedByFloor.map((el,i)=>
          <Floor floorNumber={Object.keys(el)}
            key={el.id}
            rooms={el[Object.keys(el)]}
            events={this.state.filteredEvents}
            timeToNewEvent={this.props.timeToNewEvent}
            eventEditHandler={this.props.eventEditHandler}
           />
      )}

      </div>
    </div>
    );
  }
  }
}

const RoomListWithData =graphql(gql
  `
  query getRooms{
  	rooms{
      id,
      capacity,
      floor
      title
    }
  }
  `)(RoomList)


export default RoomListWithData;
