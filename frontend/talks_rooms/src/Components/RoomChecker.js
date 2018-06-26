import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Rooms from './Rooms.js';
import WithData from '../HOC/FetchData.js';
import RoomQuery from '../Querys/RoomQuery.js';

class RoomChecker extends Component{
  state={
    choosedId:null
  }
  render(){
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
