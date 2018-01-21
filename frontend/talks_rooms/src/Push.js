import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";

class Push extends Component {

  onClick=()=>{
     let allRooms = this.props.allRooms;
    (this.props.dataToServer)
    let date = {
      title: this.props.dataToServer.title,
      dateStart: this.props.dataToServer.dateStart,
      dateEnd: this.props.dataToServer.dateEnd
    };

    let roomId = this.props.dataToServer.room;
    let currentRoom = allRooms.filter(el => el.id === roomId)[0];
    let usersIds = this.props.dataToServer.users.map(el => el.id);
    let datePushedToServer = {
      date: date,
      room: currentRoom
    };


        this.props
          .mutate({
            variables: {
              in1: date,
              in2: usersIds,
              in3: roomId
            }
          })
          .then(({ data }) => {
            ("got data", data);
          this.props.onClick(datePushedToServer);
          })
          .catch(error => {
            ("there was an error sending the query", error);
          });
  }


  // onClick = () => {
  //   let date = {
  //     title: this.props.dataToServer.title,
  //     dateStart: this.props.dataToServer.date.dateStart,
  //     dateEnd: this.props.dataToServer.date.dateEnd
  //   };
  //   let usersIds = this.props.dataToServer.members.map(el => el.id);
  //   let roomId = this.props.dataToServer.room;
  //   let allRooms = this.props.allRooms;
  //   let currentRoom = allRooms.filter(el => el.id === roomId)[0];
  //   let datePushedToServer = {
  //     date: date,
  //     room: currentRoom
  //   };
  //
  //   this.props
  //     .mutate({
  //       variables: {
  //         in1: date,
  //         in2: usersIds,
  //         in3: roomId
  //       }
  //     })
  //     .then(({ data }) => {
  //       ("got data", data);
  //       //this.props.onClick(datePushedToServer);
  //     })
  //     .catch(error => {
  //       ("there was an error sending the query", error);
  //     });
  // };

  render() {
    let formValid=this.props.formValid

    return (
      <div>

        <CreateButton text={"Создать встречу"}
          onClick={this.onClick}
          disabled={!this.props.formValid}

        />
      </div>
    );
  }
}

const createEvent = gql`
  mutation($in1: EventInput!, $in2: [ID], $in3: ID!) {
    createEvent(input: $in1, usersIds: $in2, roomId: $in3) {
      id
      title
      dateStart
      dateEnd
    }
  }
`;

const eventQuery = gql`
  query {
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
`;

const PushWithData = graphql(createEvent, {
  options: {
    update: (proxy, { data: { createEvent } }) => {
      const data = proxy.readQuery({ query: eventQuery });
      data.events.push(createEvent);
      proxy.writeQuery({ query: eventQuery, data });
    }
  }
})(Push);
export default PushWithData;
