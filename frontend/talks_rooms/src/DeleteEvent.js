import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";
import CancelButton from './CancelButton';
import  './DeleteEvent.css';


class DeleteEvent extends Component {


  onClick=()=>{
    this.props.eventDeletedHandler(false);
    // this.props.eventToDelete.id
  }


  componentWillReceiveProps=(nextProps)=>{
    if(nextProps.deleteIsPermitted){
    let eventId=nextProps.eventToDelete.id

    this.props
      .mutate({
        variables: {
          in1: eventId,
        }
      })
      .then(({ data }) => {

        this.props.eventDeletedHandler(true);
      //this.props.onClick(datePushedToServer);
      })
      .catch(error => {
      });

  }
}

  render() {
    return (
      <span className="delete-event">
      <CancelButton width={"140px"}
        isMobile={this.props.isMobile}
        text={"Удалить встречу"}
        cancelHandler={this.onClick}/>
        {this.props.isMobile ?
        <div className="delimeter"></div> : ""}
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
