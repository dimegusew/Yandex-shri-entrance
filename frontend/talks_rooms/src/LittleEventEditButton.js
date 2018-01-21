import React, { Component } from 'react';
import './LittleEventEditButton.css';
import edit from './images/edit.svg'

class LittleEventEditButton extends Component {


  render() {
    return (
      <span className="button-container">
        {this.props.text}
        <div className="event-edit-button" onClick={this.props.onClick}>
          <img src={edit}/>
          </div>
      </span>
    );
  }
}

export default LittleEventEditButton
