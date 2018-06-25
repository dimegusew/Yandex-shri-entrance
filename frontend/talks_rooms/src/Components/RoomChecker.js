import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import WithName from '../HOC/AddName'
import Rooms from './Rooms.js'

class RoomChecker extends Component{
  state={
    choosedId:null
  }
  render(){
    console.log(this.state)
  return(
    <Rooms
      {...this.state}
       name ="Рекомендованные переговорки"
       rooms = {this.props.data.rooms }
       time={this.props.dateTime}
       onClick={(data)=>this.setState({
         choosedId:data.target.id
       })}
     />
  )
}
}

const RoomCheckerWithData = ({ ...props }) => (
  <Query
    query={gql`
      {
        rooms {
          id
          title
          capacity
          floor
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading){ return(
        <div>Loading </div>
      )}
      return (
        data&&
        <RoomChecker
          data={data}
          loading={loading}
          error={error}
           {...props} />
      );
    }}
  </Query>
);


export default RoomCheckerWithData;
