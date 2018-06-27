import React, { Component } from "react";
import Rooms from './Rooms.js';
import WithData from '../HOC/FetchData.js';
import RoomQuery from '../Querys/RoomQuery.js';
import getRecomendations from '../Functions/getRecomendations.js'

class RoomChecker extends Component{
  state={
    choosedId:null
  }
  render(){
    //console.log(getRecomendations({start:'20182211T20:18',end:'20182211T20:58'},this.props.data,[1,2,3,4]))
  return(
    <Rooms
      {...this.state}
       name ="Рекомендованные переговорки"
       rooms = {this.props.data.rooms }
       time={this.props.dateTime}
       onClick={(data)=>this.setState({
         choosedId:data.target.id
       })}
       onDeleteClick={()=>this.setState({
         choosedId:null
       })}
     />
  )
}
}
export default WithData(RoomChecker,RoomQuery);
