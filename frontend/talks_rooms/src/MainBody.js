import React, { Component } from 'react';
import DateTimeBar from './DateTimeBar'
import RoomList from './RoomList';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'




class MainBody extends Component {
  constructor(props){
    let currDate=new Date();
    super(props);
    this.state={
      viewedDate : `${currDate.getFullYear()}/${currDate.getMonth()+1<10
                  ? ("0"+(currDate.getMonth()+1)):currDate.getMonth()+1}/${currDate.getDate()<10
                  ? "0"+currDate.getDate():currDate.getDate() }`
    }
  }


  choosingDate=(date)=>
    this.setState({
      viewedDate : date
    })


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
        <DateTimeBar choosingDate={this.choosingDate}/>
        <RoomList events={this.props.data.events} viewedDate={this.state.viewedDate}/>
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
