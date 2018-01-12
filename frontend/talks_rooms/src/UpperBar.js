import React, { Component } from 'react';
import CreateButton from './CreateButton';
import LogoMain from './images/logo.svg';
import './UpperBar.css';


class UpperBar extends Component {
  render() {
    return (
      <div className="upper-side">
        <div>
          <img src={LogoMain}/>
        </div>
          <CreateButton text="Создать встречу"
            className="create-button"
            onClick={this.props.onClick}
          />
      </div>
    );
  }
}

export default UpperBar;
