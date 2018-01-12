import React, { Component } from 'react';
import CancelButton from './CancelButton';
import './BottomBar.css';
import {Link} from 'react-router-dom';
import Push from './Push.js'


class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <CancelButton text={"Отмена"} cancelHandler={this.props.cancelHandler}/>
        <Push dataToServer={this.props.dataToServer}/>
      </div>
    );
  }
}




export default BottomBar;
