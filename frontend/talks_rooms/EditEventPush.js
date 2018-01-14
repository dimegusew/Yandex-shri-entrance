import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import CreateButton from "./CreateButton";
import CancelButton from './CancelButton';

class EditEventPush extends Component {

  onClick=()=>{

  }

  render() {
    return (
      <span>
       <CancelButton width={"140px"} text={"Удалить встречу"} cancelHandler={this.onClick}/>
      </span>
    );
  }
}

export default EditEventPush;
