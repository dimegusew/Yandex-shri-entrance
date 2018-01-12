import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from './CreateButton';


class Push extends Component {

  onClick=()=> {
    let date = {"title":this.props.dataToServer.title,
                  "dateStart": this.props.dataToServer.date.dateStart,
                  "dateEnd" : this.props.dataToServer.date.dateEnd }
    console.log(date)
    let usersIds=this.props.dataToServer.members.map((el)=>el.id);
    console.log(usersIds)
    let roomId=this.props.dataToServer.room;
    console.log(roomId)
    this.props
      .mutate({
        variables: {
          in1: date,
          in2: usersIds,
          in3 :roomId

        }
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }

  render() {
    return <div>
      <CreateButton text={"Создать встречу"} onClick={this.onClick}/>
    </div>;
  }
}

const createEvent = gql`
  mutation($in1: EventInput!,$in2: [ID], $in3: ID!) {
    createEvent(input:$in1, usersIds:$in2, roomId:$in3) {
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
