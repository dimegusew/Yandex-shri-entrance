import gql from "graphql-tag";
const RoomQuery= gql`
  {
    rooms {
      id
      title
      capacity
      floor
    }
  }
`

export default RoomQuery;
