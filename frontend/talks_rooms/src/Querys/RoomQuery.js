import gql from "graphql-tag";
const RoomQuery= gql`
  {
    rooms {
      id
      title
      capacity
      floor
    }
    events {
      id
      title
      dateStart
      dateEnd
      users {
        id
      }
      room {
        id
      }
    }
    formState @client{
      choosedRoom
    }
  }
`

export default RoomQuery;
