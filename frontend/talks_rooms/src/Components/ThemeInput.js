import React from "react";
import { InputWithClearButton } from "./Input.js";
import { graphql, compose, Query } from "react-apollo";
import GET_THEME from '../Querys/LocalQuerys/getTheme.js';
import gql from 'graphql-tag';


const addThemeMutation= gql`
  mutation($theme: String) {
    updateThemeState(theme: $theme) @client
  }
`;

const ThemeInput = ({...props,mutate})=>{
  console.log(props)
  return(
    <InputWithClearButton
      name="Тема"
      placeholder={"О чем будете говорить?"}
      className="text-input"
      value={props.data}
      onChange={(data)=>
        mutate({
          variables: {
            theme: data.target.value
          }
        })
      }
      onClear={(data)=>
        mutate({
          variables: {
            theme: ""
          }
        })
      }
    />
  )
}

const ThemeInputWithData = ({...props} ) => (
  <Query query={GET_THEME}>
    {({data:{formState} }) =>
        <ThemeInput
          {...props}
          data={formState.theme}
        />
    }
  </Query>
);


export default compose(
  graphql(addThemeMutation)
)(ThemeInputWithData);
