import React, { Component } from "react";
import "./App.css";
import CreateButton from "./CreateButton";
import AddButton from "./AddButton.js";
import UpperBar from "./UpperBar.js";
import MainBody from "./MainBody.js";
import { Link } from "react-router-dom";
import AppContainer from "./AppContainer.js";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import EventEdit from "./EventEdit.js";
import EventIsCreatedWindow from "./EventIsCreatedWindow.js";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:3000/graphql"
  })
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventEditPage: false,
      timeToNewEvent: {},
      dateToNewEvent: {},
      roomToNewEvent: "",
      createButtonPush: false,
      iseventCreatedOpen: false,
      dataToEventsCreatedWindow: [],
      isEditedPage : false,
      eventToEdit : {}
    };
  }
  pushingCreateButtonHandler = () => {
    this.setState({
      isEventEditPage: true,
      roomToNewEvent: null
    });
  };

  timeToNewEventHandler = (time, room) => {
    console.log(time)
    console.log("zzzzzz")
    this.setState({
      isEventEditPage: true,
      timeToNewEvent: time,
      roomToNewEvent: room
    });
  };

  cancelHandler = event => {
    this.setState({
      isEventEditPage: false,
      timeToNewEvent: { start: "", end: "" },
      isEditedPage :false,
      eventToEdit : {}
    });
  };

  dateHandler = date => {
    let fulldateDate=date.split(".")
    let [day,month,year]=fulldateDate
    this.setState({
      dateToNewEvent: `${year}-${month}-${day}`
    });
  };

  eventEditHandler=(eventToEdit)=>{
    console.log(eventToEdit)
  }

  componentDidMount() {
    this.setState({});
    createButtonPush: false;
  }

  createHandler = event => {
    this.setState({
      isEventEditPage: false,
      iseventCreatedOpen: true,
      isEditedPage :false,
      dataToEventsCreatedWindow: event
    });
  };

  eventEditHandler=(eventToEdit)=>{
    this.setState({
      isEditedPage :true,
      isEventEditPage: true,
      eventToEdit : eventToEdit
    })
    console.log(eventToEdit)
  }

  eventEditedHandler=()=>{
    this.setState({
      isEventEditPage: false,
    })
  }

  eventIsCreatedHander = () => {
    this.setState({
      isEventEditPage: false,
      iseventCreatedOpen: false
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          {this.state.iseventCreatedOpen ? (
            <EventIsCreatedWindow
              onClick={this.eventIsCreatedHander}
              dataToEventsCreatedWindow={this.state.dataToEventsCreatedWindow}
            />
          ) : (
            ""
          )}

          <AppContainer>
            <UpperBar onClick={this.pushingCreateButtonHandler} />
            {this.state.isEventEditPage ? (
              <EventEdit
                cancelHandler={this.cancelHandler}
                timeToNewEvent={this.state.timeToNewEvent}
                dateToNewEvent={this.state.dateToNewEvent}
                roomToNewEvent={this.state.roomToNewEvent}
                createButtonPush={this.state.createButtonPush}
                createHandler={this.createHandler}
                isEditedPage={this.state.isEditedPage}
                eventToEdit={this.state.eventToEdit}
                eventEditedHandler={this.eventEditedHandler}
              />
            ) : (
              <MainBody
                timeToNewEvent={this.timeToNewEventHandler}
                viewedDate={this.dateHandler}
                eventEditHandler={this.eventEditHandler}
              />
            )}
          </AppContainer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
