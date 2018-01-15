import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";
import CancelButton from './CancelButton';

class DeleteEvent extends Component {


  onClick=()=>{
    console.log(this.props.eventToDelete.id)
    this.props.eventDeletedHandler(false);
    // this.props.eventToDelete.id
  }


  componentWillReceiveProps=(nextProps)=>{
    console.log(nextProps)
    if(nextProps.deleteIsPermitted){
    let eventId=nextProps.eventToDelete.id

    this.props
      .mutate({
        variables: {
          in1: eventId,
        }
      })
      .then(({ data }) => {
        console.log("remove data", data);
        this.props.eventDeletedHandler(true);
      //this.props.onClick(datePushedToServer);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });

  }
}

  render() {
    console.log(this.props.deleteIsPermitted)
    return (
      <span>
      <CancelButton width={"140px"} text={"Удалить встречу"}
        cancelHandler={this.onClick}/>
      </span>
    );
  }
}


//
const removeEvent = gql`
mutation ($in1:ID!){
	removeEvent(id:$in1) {
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
//
const eventQuery = gql`
query{
events{
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

//
const DeleteEventWithData = graphql(removeEvent, {
  options: {
    update: (proxy, { data: { removeEvent } }) => {
      const data = proxy.readQuery({ query: eventQuery });
      data.events.push(removeEvent);
      proxy.writeQuery({ query: eventQuery, data });
    }
  }
})(DeleteEvent);
//
//
//
//
//
//







export default DeleteEventWithData;
