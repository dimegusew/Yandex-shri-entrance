import React from 'react';
import WithLoading from '../HOC/AddLoader.js'

const DropDownItem = ({el,...props})=>{
  return (
    <div
      className = 'dropdown-item'
      onMouseDown={props.onClick} id ={el.login}>
      <img alt={"user-avatar"} src = {el.avatarUrl}/>
      {el.login}
      <div>{`·${el.homeFloor} этаж`} </div>
    </div>
  )
}

const DropDownItems = ({input,...props})=>{
  console.log(props)
  const logins= props.choosedUsers.map(el=>el ? el.login : "");
  return(
    <div className='dropdown'>
      {props.users.filter(el=>(el.login
      .indexOf(input)!==-1) && logins.indexOf(el.login)===-1)
      .map(el=>
        <DropDownItem el={el} key={el.id} {...props}/>
  )} </div>
  )
}

const DropDown = ({input,...props})=>{
  return(
    <DropDownItems input={input} {...props}
    />)
}

export default WithLoading(DropDown);
