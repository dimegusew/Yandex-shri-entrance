import React from 'react';
import WithName from '../HOC/AddName.js'
import WithDropDown from '../HOC/AddDropDown.js'
import WithClearButton from '../HOC/AddClearButton.js'

const Input = ({...props})=>{
  return(
    <input {...props}/>
  )
}
export default WithName(Input);
export const InputWithDropDown = WithDropDown(WithName(Input))
export const InputWithClearButton = WithClearButton(WithName(Input))
