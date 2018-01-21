import React, { Component } from "react";
import UpperBar from "./UpperBar.js";
import AppContainer from "./AppContainer.js";
import MainBodyEvent from "./MainBodyEvent.js";
import BottomBar from "./BottomBar";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "react-apollo";

import EventIsCreatedWindow from './EventIsCreatedWindow.js'

class EventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersInEvent: [],
      title: "",
      events: [],
      // isCreateButtonPushed : false,
      dataToServer : [],
    };
  }

  createHandler = (data) => {
    ("create handler")
    this.props.createHandler(data);

  };

  addedUsersHandler = users => {
    this.setState({
      membersInEvent: users
    });
  };

  addedTitleHandler = title => {
    this.setState({
      title: title
    });
  };

  roomHandler = room => {
    this.setState({
      room: room
    });
  };

  dataToServerHandler=(data)=>{
    //  (data)
    // this.setState({
    //   dateToServer : data
    // })

    (data)
    this.date=data;
    ("date")
  }




  componentWillReceiveProps(nextProps) {
    nextProps.eventsQuery.events
      ? this.setState({ events: nextProps.eventsQuery.events })
      : "";
  }

  render() {
    let splitDate = this.props.dateToNewEvent.split(".");
    let convertedDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];

    let date = {
      dateStart:
        convertedDate + "T" + this.props.timeToNewEvent.start + ":00.981Z",
      dateEnd: convertedDate + "T" + this.props.timeToNewEvent.end + ":00.981Z"
    };

    if (
      this.props.usersQuery.loading ||
      this.props.roomQuery.loading ||
      this.props.eventsQuery.loading
    ) {
      return <div>Loading</div>;
    }

    if (
      this.props.usersQuery.error ||
      this.props.roomQuery.error ||
      this.props.eventsQuery.error
    ) {
      return <div>An unexpected error occurred</div>;
    } else {
      return (
        <div>
          {/* <UpperBar/> */}
          {/* <EventIsCreatedWindow/> */}
          <MainBodyEvent
            deleteIsPermitted={this.props.deleteIsPermitted}
            isEditedPage={this.props.isEditedPage}
            users={this.props.usersQuery.users}
            rooms={this.props.roomQuery.rooms}
            events={this.state.events}
            timeToNewEvent={this.props.timeToNewEvent}
            dateToNewEvent={this.props.dateToNewEvent}
            roomToNewEvent={this.props.roomToNewEvent}
            cancelHandler={this.props.cancelHandler}
            createHandler={this.props.createHandler}
            addedUsersHandler={this.addedUsersHandler}
            addedTitleHandler={this.addedTitleHandler}
            roomHandler={this.roomHandler}
            dataToServer={this.dataToServerHandler}
            allRooms={this.props.roomQuery.rooms}
            cancelHandler={this.props.cancelHandler}
            createHandler={this.createHandler}
            eventToEdit={this.props.eventToEdit}
            eventEditedHandler={this.props.eventEditedHandler}
            eventDeletedHandler={this.props.eventDeletedHandler}
            // roomToServer={this.roomToServerHandler}
            // timeToServer={this.timeToServerHandler}
            // usersToServer={this.usersToSererHandler}
            isCreateButtonPushed ={this.props.createButtonPush}
          />
        </div>
      );
    }
  }
}

const queries = {
  getUsers: gql`
    {
      users {
        id
        login
        avatarUrl
        homeFloor
      }
    }
  `,
  getRooms: gql`
    {
      rooms {
        id
        title
        capacity
        floor
      }
    }
  `,
  getEvents: gql`
    {
      events {
        id
        dateStart
        dateEnd
        title
        users {
          id
        }
        room {
          id
        }
      }
    }
  `
};

export default compose(
  graphql(queries.getUsers, {
    name: "usersQuery"
  }),
  graphql(queries.getRooms, {
    name: "roomQuery"
  }),
  graphql(queries.getEvents, {
    name: "eventsQuery"
  })
)(EventEdit);
