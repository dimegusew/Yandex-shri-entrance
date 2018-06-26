import React from "react";
import WithName from '../HOC/AddName';

const Room =({el,...props})=>{
  let {start,end} = props.time.time;
  let style = (el.id===props.choosedId) ? {'backgroundColor':' #007DFF','color':'white'}:{}
  return(
    <div className='Room' id ={el.id} style={style}  onClick={props.onClick}>
      <div>{start}-{end+" "}</div>
      <div>{el.title}</div>
      <div>{`${el.floor} этаж`}</div>
    <div onDeleteClick={props.onDeleteClick}>{(el.id===props.choosedId)&&'x'}</div>
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

export default WithName(Rooms);
