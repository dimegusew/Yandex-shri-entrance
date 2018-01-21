import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";
import CancelButton from './CancelButton';

class EditEventPush extends Component {

  onClick=()=>{
    let data=this.props.dataToServer;
    let eventId=this.props.eventToEdit.id
    let id=this.props.eventToEdit.id;
    let inp={dateStart: data.dateStart,
              dateEnd: data.dateEnd,
            title:data.title}

    let roomId=data.room
    let usersIds=data.users.map(el => el.id)


    this.props
      .mutate({
        variables: {
          in1: eventId,
          in2: inp,
          in3: roomId,
          in4:usersIds
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
      this.props.onClick();
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }

  render() {
    return (
      <span>
        <CancelButton width={"101px"} text={"Сохранить"} cancelHandler={this.onClick}/>
      </span>
    );
  }
}


const updateEvent = gql`
mutation ($in1:ID!,$in2:EventInput!,$in3:ID!,$in4:[ID]){
	updateEvent(id:$in1 input:$in2 roomId:$in3 usersIds:$in4) {
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

}
`;

const eventQuery = gql`
query{
events{
id,
  dateStart,
  dateEnd,
  title,
  users {
    id
  },
  room {
    id
  }

}
}
`;


const EditEventPushWithData = graphql(updateEvent, {
  options: {
    update: (proxy, { data: { updateEvent } }) => {
      const data = proxy.readQuery({ query: eventQuery });
      data.events.push(updateEvent);
      proxy.writeQuery({ query: eventQuery, data });
    }
  }
})(EditEventPush);













export default EditEventPushWithData;
