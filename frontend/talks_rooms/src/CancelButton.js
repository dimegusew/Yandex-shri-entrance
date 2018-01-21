import React, { Component } from "react";
import "./CancelButton.css";

class CancelButton extends Component {
  render() {
    let backgroundColor = this.props.isMobile ? "white" : "#E9ECEF";
    let color = this.props.isMobile ? "#FF3333" : "black";
    let width = this.props.isMobile ? "200px" : this.props.width;
    let myStyle = {
      width: width,
      backgroundColor: backgroundColor,
      color: color
    };
    return (
      <button
        style={myStyle}
        className="cancelButton"
        onClick={this.props.cancelHandler}
      >
        <span>{this.props.text}</span>
      </button>
    );
  }
}

export default CancelButton;
