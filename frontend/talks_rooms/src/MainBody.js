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
  {
    this.setState({
      viewedDate : date
    })
    let splitedDate=date.split("/")
    let formatedDate=splitedDate[2]+"."+splitedDate[1]+"."+splitedDate[0]
    this.props.viewedDate(formatedDate)
}

  componentWillReceiveProps(nextProps){
    let splited=this.state.viewedDate.split("/")
    let formated=splited[2]+"."+splited[1]+"."+splited[0]
    nextProps.viewedDate(formated)
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
    return (
      <div>
        <DateTimeBar choosingDate={this.choosingDate}

        />
        <RoomList
          events={this.props.data.events}
          viewedDate={this.state.viewedDate}
          timeToNewEvent={this.props.timeToNewEvent}
          eventEditHandler={this.props.eventEditHandler}
        />
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
      avatarUrl,
      id
    }
    }
  }

  `)(MainBody)


export default MainBodywithEvents;
