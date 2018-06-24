import React from 'react';

const WithLoading = (DropDown)=>({...props})=>{
  if (props.loading) return <p>Loading...</p>;
  if (props.error) return <p>Error :(</p>;
    return (<DropDown {...props}/>)
}

export default WithLoading;
