import React from "react";
import Rooms from "../Components/Rooms.js";
import WithData from "../HOC/FetchData.js";
import RoomQuery from "../Querys/RoomQuery.js";
import { graphql, compose} from "react-apollo";
import gql from "graphql-tag";

const RoomChecker = ({ mutate, ...props }) => {
  return (
    <Rooms
      choosedId={props.data.formState.choosedRoom}
      name="Рекомендованные переговорки"
      rooms={props.data.rooms}
      time={props.dateTime}
      onClick={({ target }) => {
        mutate({
          variables: {
            room: target.id
          }
        });
      }}
      onDeleteClick={({ target }) => {
        mutate({
          variables: {
            room: target.id
          }
        });
      }}
    />
  );
};

const addRoomMutation = gql`
  mutation($room: Object!) {
    addRoomState(room: $room) @client
  }
`;

export default compose(graphql(addRoomMutation))(
  WithData(RoomChecker, RoomQuery)
);
