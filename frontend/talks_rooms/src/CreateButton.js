import React, { Component } from 'react';
import './CreateButton.css';

class CreateButton extends Component {


  render() {
    return (
        <button className="createButton" onClick={this.props.onClick}>
          {this.props.text}
          </button>
    );
  }
}

export default CreateButton
