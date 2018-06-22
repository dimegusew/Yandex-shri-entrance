import React, {Component} from 'react';
import DropDown from '../Components/DropDown';
import Arrow1 from '../assets/arrow1.js'
import Arrow2 from '../assets/arrow2.js'


const WithDropDown = (InputComponent)=>
class extends Component {
  state={input:"",isOpen:false,choosedItem:null}
  render(){
    return(
      <div className='input-with-dropdown'
         onBlur={(el)=>this.setState({isOpen:false})}>
      <InputComponent
        tabIndex="1"
         onChange = {(data)=>this.setState({input:data.target.value,isOpen:true})}
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

export default WithDropDown;
