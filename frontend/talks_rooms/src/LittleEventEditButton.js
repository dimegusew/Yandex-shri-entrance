import React, { Component } from 'react';
import './LittleEventEditButton.css';
import edit from './images/edit.svg'

class LittleEventEditButton extends Component {


  render() {
    return (
      <span className="button-container">
        {this.props.text}
        <button className="event-edit-button" onClick={this.props.onClick}>
          <img src={edit}/>
          </button>
      </span>
    );
  }
}

export default LittleEventEditButton
