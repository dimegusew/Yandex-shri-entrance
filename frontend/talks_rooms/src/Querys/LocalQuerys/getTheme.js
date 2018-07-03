import gql from 'graphql-tag';

const GET_THEME = gql`
  query {
    formState @client{
      theme
    }
  }
`;

export default GET_THEME;
