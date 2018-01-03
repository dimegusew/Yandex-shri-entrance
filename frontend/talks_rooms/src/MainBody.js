import React, { Component } from 'react';
import DateTimeBar from './DateTimeBar'
import RoomList from './RoomList';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'




class MainBody extends Component {

  render() {
    if (this.props.data.loading) {
        return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    else {
    return (
      <div>
        <DateTimeBar/>
        <RoomList events={this.props.data.events}/>
    </div>
    );
  }
}
}

const MainBodywithEvents =graphql(gql
  `
  query{
   events{
  	id,
    title,
    dateStart,
    dateEnd
    room {
      id,
      title
    },
    users{
      login,
      homeFloor,
      avatarUrl
    }
    }
  }

  `)(MainBody)


export default MainBodywithEvents;
