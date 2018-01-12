import React, { Component } from 'react';
import './CancelButton.css';


class CancelButton extends Component {


  render() {
    return (
      <button className="cancelButton" onClick={this.props.cancelHandler}>
        {this.props.text}
      </button>
    );
  }
}

export default CancelButton
