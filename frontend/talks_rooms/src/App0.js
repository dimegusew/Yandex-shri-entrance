import React, { Component } from 'react';
import './App.css';
import CreateButton from './CreateButton'
import AddButton from './AddButton.js'
import UpperBar from './UpperBar.js'
import MainBody from './MainBody.js'
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer.js';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import EventEdit from './EventEdit.js'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})



class App extends Component {
  constructor(props){
    super(props)
    this.state={
      isEventEditPage : false,
      timeToNewEvent : {},
      dateToNewEvent : {},
      roomToNewEvent : ""

    }
  }
  clickHandler=()=>{
    this.setState({
      isEventEditPage : true
    })
  }

  timeToNewEventHandler=(time,room)=>{
    this.setState({
      isEventEditPage : true,
      timeToNewEvent : time,
      roomToNewEvent : room
    })
  }

  cancelHandler=(event)=>{
    this.setState({
      isEventEditPage : false,
      timeToNewEvent : {"start":"", "end" : ""}
    })
  }

  dateHandler=(date)=>{
    this.setState({
      dateToNewEvent : date
    })
  }


  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer>
          <UpperBar onClick={this.clickHandler}/>
          {this.state.isEventEditPage ?
             <EventEdit
               cancelHandler={this.cancelHandler}
               timeToNewEvent={this.state.timeToNewEvent}
               dateToNewEvent={this.state.dateToNewEvent}
               roomToNewEvent={this.state.roomToNewEvent}
             />
          :  <MainBody
                timeToNewEvent={this.timeToNewEventHandler}
                viewedDate={this.dateHandler}


          />
          }
        </AppContainer>
      </ApolloProvider>
    );
  }
}

export default App
