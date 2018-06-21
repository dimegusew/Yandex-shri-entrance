import React from 'react';
const WithName = (Component)=>({name,...props})=>
{
  return(
    <div className = "input-with-name">
      <p>{name}</p>
      <Component {...props}/>
    </div>
  )
}
export default WithName;
