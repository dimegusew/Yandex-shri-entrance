import React, { Component } from 'react';
import UpperBar from "./UpperBar.js"
import AppContainer from "./AppContainer.js"
import MainBodyEvent from "./MainBodyEvent.js"
import BottomBar from './BottomBar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { compose } from 'react-apollo';


class EventEdit extends Component {
  render() {
    if (this.props.usersQuery.loading
        ||this.props.roomQuery.loading
        ||this.props.eventsQuery.loading) {
        return (<div>Loading</div>)
    }

    if (this.props.usersQuery.error
        ||this.props.roomQuery.error
        ||this.props.eventsQuery.error) {
      return (<div>An unexpected error occurred</div>)
    }

    else {
    return (
          <AppContainer>
            <UpperBar/>
            <MainBodyEvent
                users={this.props.usersQuery.users}
                rooms={this.props.roomQuery.rooms}
                events={this.props.eventsQuery.events}
            />
            <BottomBar/>
          </AppContainer>
    );
  }
  }
}

const queries = {
  getUsers : gql`
  {
   users{
  	id,
    login,
    avatarUrl,
    homeFloor
  }
}
`,
  getRooms : gql`
  {
   rooms{
  	id,
    title,
    capacity,
    floor

  }
}
`,
getEvents : gql`
{
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
`
}







  export default compose(graphql(queries.getUsers, {
    name : "usersQuery"
  }),
  graphql(queries.getRooms, {
      name: "roomQuery"
   }),
   graphql(queries.getEvents, {
       name: "eventsQuery"
    }),
)(EventEdit)
