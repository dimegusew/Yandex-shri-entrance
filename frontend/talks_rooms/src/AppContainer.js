import React, { Component } from 'react';
import './App.css';


class AppContainer extends Component {
  render() {
    return (
      <div className="container">
      <div className="App">
        {this.props.children}
      </div>
    </div>

    );
  }
}

export default AppContainer
