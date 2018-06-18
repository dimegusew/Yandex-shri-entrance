import React from 'react';
const AddName = (Component)=>({name,...props})=>
{
  return(
    <div className = "input-with-name">
      {name}
      <Component {...props}/>
    </div>
  )
}
export default AddName;
