import React from 'react';

const DropDownItem = ({el,...props})=>{
  return (
    <div
      // onBlur={()=>console.log("dd")}
      className = 'dropdown-item'
      onMouseDown={props.onClick} id ={el.login}>
      <img src = {el.avatarUrl}/>
      {el.login}
      <div>{`·${el.homeFloor} этаж`} </div>
    </div>
  )
}

const DropDown = ({input,...props})=>{
  const logins= props.users.map(el=>el ? el.login : "");
  return(
    <div className='dropdown'>
      {props.data.filter(el=>(el.login
      .indexOf(input)!==-1) && logins.indexOf(el.login)===-1)
      .map(el=>
        <DropDownItem el={el} {...props}/>
  )} </div>)
}

export default DropDown;
