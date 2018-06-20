import React from 'react';
import {InputWithDropDown} from '../Components/Input.js'

const User = ({...props})=>{
  return(
    <div className = "choosed-user">
      <img src={props.avatarUrl}/>
      <p5>{props.login}</p5>
    <p5 id ={props.login} onClick={props.onDeleteClick}>x</p5>
    </div>
  )
}

const UserList = ({users,...props})=>{
  return(
    <div className= 'user-list'>
      {users.map(el=>
        <User
          {...el}
          {...props}/>
      )}
    </div>
  )
}

const UserChecker=({...props})=>{
  return(
    <div>
      <InputWithDropDown
         {...props}/>
      <UserList {...props}/>
    </div>
  )
}
export default UserChecker;
