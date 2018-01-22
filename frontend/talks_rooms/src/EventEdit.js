import React, { Component } from "react";
import MainBodyEvent from "./MainBodyEvent.js";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "react-apollo";


class EventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersInEvent: [],
      title: "",
      events: [],
      dataToServer: []
    };
  }

  createHandler = data => {
    ("create handler");
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

  dataToServerHandler = data => {
    // data;
    this.date = data;
    // ("date");
  };

  componentWillReceiveProps(nextProps) {
    nextProps.eventsQuery.events
      ? this.setState({ events: nextProps.eventsQuery.events })
      : "";
  }

  render() {
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
            isCreateButtonPushed={this.props.createButtonPush}
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
