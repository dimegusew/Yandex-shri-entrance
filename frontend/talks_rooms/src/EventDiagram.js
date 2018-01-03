import React, { Component } from 'react';
import './EventDiagram.css';



class Tooltip extends Component {

  convertDateTime(date){
    let splitDate = date.split("T")[0].split("-");
    let dayNumb =splitDate[2];
    let mounthNumb= splitDate[1];
    let splitTime=date.split("T")[1].split(":")
    let hour=splitTime[0];
    let minute=splitTime[1];

    let mounths=['января','февраля','марта','апреля','мая','июня','июля'
  ,'августа','сентября','октября','ноября','декабря'];

    return {"date" : (dayNumb + " "+ mounths[mounthNumb-1]),
            "time" : hour + ":" + minute}
  }

  render() {
    let event=this.props.event;
    let numberOfUsers=event.users.length;
    return (
      <span className="tooltiptext">
        <h3> {event.title}</h3>
        <div className='date-room'>
            {this.convertDateTime(event.dateStart).date}
          , {this.convertDateTime(event.dateStart).time}
           —{this.convertDateTime(event.dateEnd).time} ⋅ {event.room.title}
        </div>

       <div className='user'>
         {numberOfUsers ? <img src={event.users[0].avatarUrl}/> : ""}
         <span>
           {!numberOfUsers ? "Нет участников"
           : <div className="users-info">
              {event.users[0].login}
              <span>&nbsp;{"и "+ numberOfUsers +
             " участник" + (numberOfUsers==1 ? "" : (numberOfUsers<4 ? "а" : "ов"))}
          </span>
        </div>}
       </span>
       </div>
      </span>
    );
  }
}

class Event extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isClicked :false,
      isHovered:false
    }
  }

  clickHandler=(events)=>
    { this.setState({
      isClicked : !this.props.isClicked
    })
    this.props.clicked(!this.props.isClicked)}

  mouseLeaveHandler=()=>
    {this.setState({
        isClicked : false,
        isHovered :false
      })
    this.props.clicked(false)}


    mouseEnterHandler=()=>
      {this.setState({
          isHovered :true
        })
      // this.props.clicked(false)}
    }

  convertTime(time){
    return time
          .split("T")[1]
          .split(".")[0]
          .split(":")
          .reduce((acc,curr,i,arr)=>arr[0]*60+parseInt(arr[1]))
  }

	getPosition(startTime,endTime){
    let coef=1.1; //coordinate 1.1
    let startCoordinate=(this.convertTime(startTime)-450)*coef;
    let stopCoordinate=(this.convertTime(endTime)-450)*coef;
		return{"startPosition":startCoordinate,
					"duration":stopCoordinate-startCoordinate}
	}


  render() {
    let event=this.props.event;
		let position=this.getPosition(event.dateStart,
    event.dateEnd);
		let left= position.startPosition;
		let width=position.duration;
		 let myStyle={'left':left,
								 'width':width}

    return (
        <div className="Event" style={myStyle}
          onClick={this.clickHandler}
          onMouseLeave={this.mouseLeaveHandler}
          onMouseEnter={this.mouseEnterHandler}>

          {this.state.isClicked ? <Tooltip event={event}/>
           : ""}
				</div>
    );
  }
}

class EventDiagram extends Component {

  clicked=(ev)=>
    this.props.roomEnabled(ev)

    hovered=(ev)=>
      this.props.roomHovered(ev)


  mouseEnter=()=>
    this.hovered(true)

    mouseLeave=()=>
      this.hovered(false)


  render() {
    return (
      <div className="event-diagram"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        >
        {this.props.events.map((el)=>
            <Event event={el} clicked={this.clicked}/>
       )}
       <div className="add-button"> </div>
        </div>
    );
  }
}
export default EventDiagram;
