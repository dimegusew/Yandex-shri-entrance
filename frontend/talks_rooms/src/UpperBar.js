import React, { Component } from 'react';
import CreateButton from './CreateButton';
import LogoMain from './images/logo.svg';
import './UpperBar.css';

function UpperBar() {
  return(
  <div className="upper-side">
    <div>
      <img src={LogoMain}/>
    </div>
    <CreateButton text="Создать встречу" className="create-button"/>
  </div>
)}

export default UpperBar;
