import React, { Component } from "react";
import "./CreateButton.css";

class CreateButton extends Component {
  render() {
    return (
      <button
        className="createButton"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    );
  }
}

export default CreateButton;
