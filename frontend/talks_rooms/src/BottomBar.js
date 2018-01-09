import React, { Component } from 'react';
import CreateButton from './CreateButton';
import CancelButton from './CancelButton';
import './BottomBar.css';
import {Link} from 'react-router-dom';


class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <Link to="/">
        <CancelButton text={"Отмена"}/>
      </Link>
        <CreateButton text={"Создать встречу"}/>
      </div>
    );
  }
}




export default BottomBar;
