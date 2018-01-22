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
import EventDeleteWindow from "./EventDeleteWindow.js";

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
      isEditedPage: false,
      eventToEdit: {},
      eventDeletePageIsOpen: false,
      deleteIsPermitted: false
    };
  }
  pushingCreateButtonHandler = () => {
    // обработчик нажатий на кнопку создать
    this.setState({
      isEventEditPage: true,
      roomToNewEvent: null,
      createButtonPush: true,
      isEditedPage: false
    });
  };

  timeToNewEventHandler = (time, room) => {
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
      isEditedPage: false,
      eventToEdit: {}
    });
  };


  dateHandler = date => {
    let fulldateDate = date.split(".");
    let [day, month, year] = fulldateDate;
    const MONTHS =  [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    this.setState({
      dateToNewEvent: `${day} ${MONTHS[parseInt(month,10)-1]} ${year} г.`
    });
  };

  componentDidMount() {
    this.setState({});
    createButtonPush: false;
  }

  createHandler = event => {
    // обработчик нажатий на свободный слот диаграммы
    this.setState({
      isEventEditPage: false,
      iseventCreatedOpen: true,
      isEditedPage: false,
      dataToEventsCreatedWindow: event,
      eventToEdit: {}
    });
  };

  eventEditHandler = eventToEdit => {
    this.setState({
      isEditedPage: true,
      isEventEditPage: true,
      eventToEdit: eventToEdit
    });
  };

  eventEditedHandler = () => {
    this.setState({
      isEventEditPage: false,
      isEditedPage: false,
      eventToEdit: {}
    });
  };

  eventDeletedHandler = condition => {
    if (!condition) {
      this.setState({
        eventDeletePageIsOpen: true
      });
    } else {
      this.setState({
        isEventEditPage: false,
        deleteIsPermitted: false,
        isEditedPage: false
      });
    }
  };

  eventIsCreatedHander = () => {
    this.setState({
      isEventEditPage: false,
      iseventCreatedOpen: false,
      timeToNewEvent: { start: "", end: "" }
    });
  };

  eventDeleteWindowHandler = command => {
    if (command === "cancel") {
      this.setState({
        eventDeletePageIsOpen: false,
        deleteIsPermitted: false
      });
    } else if (command === "delete") {
      this.setState({
        eventDeletePageIsOpen: false,
        deleteIsPermitted: true
        // eventToEdit : {}
        //isEventEditPage:false
      });
    }
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
          {this.state.eventDeletePageIsOpen ? (
            <EventDeleteWindow
              eventDeleteWindowHandler={this.eventDeleteWindowHandler}
            />
          ) : (
            ""
          )}

          <AppContainer>
            <UpperBar
              onClick={this.pushingCreateButtonHandler}
              isEventEditPage={this.state.isEventEditPage}
            />
            {this.state.isEventEditPage ? (
              <EventEdit
                deleteIsPermitted={this.state.deleteIsPermitted}
                cancelHandler={this.cancelHandler}
                timeToNewEvent={this.state.timeToNewEvent}
                dateToNewEvent={this.state.dateToNewEvent}
                roomToNewEvent={this.state.roomToNewEvent}
                createButtonPush={this.state.createButtonPush}
                createHandler={this.createHandler}
                isEditedPage={this.state.isEditedPage}
                eventToEdit={this.state.eventToEdit}
                eventEditedHandler={this.eventEditedHandler}
                eventDeletedHandler={this.eventDeletedHandler}
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
