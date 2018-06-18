import React from 'react';

const DropDown = ({input,...props})=>{
  return(
    <div className='dropdown'>
      {props.data.filter(el=>(el.login
      .indexOf(input)!==-1) && props.users.indexOf(el.login)==-1)
      .map(el=>
        <div
          //className='dropdown'
          onClick={props.onClick} id ={el.login}>
          {el.login}
        </div>
  )} </div>)
}

export default DropDown;
