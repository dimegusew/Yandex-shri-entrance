import React, { Component } from 'react';
import './CancelButton.css';

class CancelButton extends Component {
  render() {
    let myStyle={"width":this.props.width }
    return (
      <button style = {myStyle} className="cancelButton" onClick={this.props.cancelHandler}>
        <span>{this.props.text}</span>
      </button>
    );
  }
}

export default CancelButton
