import gql from 'graphql-tag';

const GET_DATE_TIME = gql`
  query {
    formState @client{
      dateTime{
        dateStart,
        dateEnd,
        timeStart,
        timeEnd
      }
    }
  }
`;

export default GET_DATE_TIME;
