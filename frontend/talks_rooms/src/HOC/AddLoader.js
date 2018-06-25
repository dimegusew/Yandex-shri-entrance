import React from 'react';

const WithLoading = (Component)=>({...props})=>{
  if (props.loading) return <p className='loading'>Loading...</p>;
  if (props.error) return <p>Error :(</p>;
    return (<Component {...props}/>)
}

export default WithLoading;
