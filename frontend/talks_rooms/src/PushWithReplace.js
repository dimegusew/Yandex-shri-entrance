import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";

class PushWithReplace extends Component {

  onClick=()=>{
    let EventToSwap= this.props.dataToServer.roomSwap.event
    let RoonToSwapEvent= this.props.dataToServer.roomSwap.room
     let allRooms = this.props.allRooms;
    console.log(this.props.dataToServer)
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
    console.log(currentRoom)
    console.log("curr room")


        this.props
          .mutate({
            variables: {
              in1:EventToSwap,
              in2:RoonToSwapEvent,
              in3: date,
              in4: usersIds,
              in5: roomId
            }
          })
          .then(({ data }) => {
            console.log("got data", data);
          this.props.onClick(datePushedToServer);
          })
          .catch(error => {
            console.log("there was an error sending the query", error);
          });


    console.log("PUSH THIS DATE TO SER")
    console.log(date)
    console.log(usersIds)
    console.log(roomId)
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
  //       console.log("got data", data);
  //       //this.props.onClick(datePushedToServer);
  //     })
  //     .catch(error => {
  //       console.log("there was an error sending the query", error);
  //     });
  // };

  render() {
    let formValid=this.props.formValid
    console.log(this.props.formValid)

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

const changeEventRoom = gql`
  mutation($in1: ID!, $in2: ID!, $in3:EventInput!, $in4:[ID], $in5:ID!) {
    changeEventRoom(id:$in1, roomId:$in2) {
    	  id,
        title,
        dateStart,
        dateEnd,
        room {
          id
        },
        users {
          id
        }
    	}

      createEvent(input: $in3, usersIds: $in4, roomId: $in5) {
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

const PushWithReplaceWithData = graphql(changeEventRoom, {
  options: {
    update: (proxy, { data: { createEvent } }) => {
      const data = proxy.readQuery({ query: eventQuery });
      data.events.push(changeEventRoom);
      proxy.writeQuery({ query: eventQuery, data });
    }
  }
})(PushWithReplace);
export default PushWithReplaceWithData;
