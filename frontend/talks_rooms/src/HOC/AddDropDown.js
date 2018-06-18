import React, {Component} from 'react';
import DropDown from '../Components/DropDown'


const AddDropDown = (InputComponent)=>
class extends Component {
  state={input:"",isOpen:false,choosedItem:null}
  render(){
    console.log(this.state)

    return(
      <div>
      <InputComponent
         onChange = {(data)=>this.setState({input:data.target.value})}
         onFocus = {()=>this.setState({isOpen:true})}
         value ={this.state.input}
         {...this.props}
       />
     {this.state.isOpen &&
       <DropDown
         onClick={(data)=>
         this.setState({
           isOpen:false,
           choosedItem:data.target.id,
           input:""
         },
        this.props.onInp(data.target.id))}
         {...this.props}
         {...this.state}
       />
      }
      </div>
    )
  }
}

export default AddDropDown;
