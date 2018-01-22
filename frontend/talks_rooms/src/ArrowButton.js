import React from 'react';
import './ArrowButton.css'

function ArrowButton({ arrow }) {
  return(
    <div className="circle-button">
      <img src={arrow}/>
    </div>
)}

export default ArrowButton;
