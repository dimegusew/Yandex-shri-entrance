import React from "react";
import { InputWithClearButton } from "./Input.js";
import { graphql, compose, Query } from "react-apollo";
import GET_THEME from "../Querys/LocalQuerys/getTheme.js";
import gql from "graphql-tag";

const ThemeInput = ({ mutate, ...{data} }) => {
  return (
    <InputWithClearButton
      name="Тема"
      placeholder={"О чем будете говорить?"}
      className="text-input"
      value={data}
      onChange={({ target }) =>
        mutate({
          variables: {
            theme: target.value
          }
        })
      }
      onClear={() =>
        mutate({
          variables: {
            theme: ""
          }
        })
      }
    />
  );
};

const addThemeMutation = gql`
  mutation($theme: String) {
    updateThemeState(theme: $theme) @client
  }
`;

const ThemeInputWithData = ({ ...props }) => (
  <Query query={GET_THEME}>
    {({ data: { formState } }) => (
      <ThemeInput {...props} data={formState.theme} />
    )}
  </Query>
);

export default compose(graphql(addThemeMutation))(ThemeInputWithData);
