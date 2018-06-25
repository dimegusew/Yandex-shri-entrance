import React, { Component } from "react";
import WithName from '../HOC/AddName';
import WithLoader from '../HOC/AddLoader';

const Room =({el,...props})=>{
  console.log(props.choosedId)
  let {start,end} = props.time.time;
  return(
    <div className='Room' id ={el.id}  onClick={props.onClick}>
      <div>{start}-{end+" "}</div>
      <div>{el.title}</div>
      <div>{`${el.floor} этаж`}</div>
     </div>
  )
}

const Rooms =({...props}) =>{
  return(
    <div className='Rooms'>
      {props.rooms.map(el=>
        <Room el={el} {...props}/>
    )}
    </div>
  )
}

export default WithLoader(WithName(Rooms));
