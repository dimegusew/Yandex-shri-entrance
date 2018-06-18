import React, {Component} from 'react';
import DropDown from '../Components/DropDown'

const AddDropDown = (InputComponent)=>
class extends Component {
  state={input:"",isOpen:false,choosedItem:null}

  setInput = (data) =>
    this.setState({input:data.target.value})

  openDropDown = () =>
    this.setState({isOpen:true})

  addUser = (data)=>{
    this.setState({
      isOpen:false,
      choosedItem:data.target.id,
      input:""
    },
   this.props.onInp(data.target.id))}


  render(){
    return(
      <div>
      <InputComponent
         onChange = {this.setInput}
         onFocus={this.openDropDown}
         value ={this.state.input}
         {...this.props}
       />
     {this.state.isOpen &&
      <DropDown
        onClick={this.addUser}
       {...this.props}
       {...this.state}
      />
      }
      </div>
    )
  }
}

export default AddDropDown;
