import React from 'react';
import AddName from '../HOC/AddName.js'
import AddDropDown from '../HOC/AddDropDown.js'

const Input = ({...props})=>{
  return(
    <input {...props}/>
  )
}
export default AddName(Input);
export const InputWithDropDown = AddDropDown(AddName(Input))
