import React from 'react';

const DropDown = ({input,...props})=>{
  return(
    <div>
      {props.data.filter(el=>el.login
      .indexOf(input)!==-1)
      .map(el=>
        <div onClick={props.onClick} id ={el.login}>
          {el.login}
        </div>
  )} </div>)
}

export default DropDown;
