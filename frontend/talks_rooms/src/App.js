import React, { Component } from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from './Components/DateTime.js';
import InputWithName, {InputWithDropDown} from './Components/Input.js'
import Mock from './MockUsers.js'

const UserList = ({users})=>{
  return(
    <div>
      {users.map(el=>
        <div>{el}</div>
      )}
    </div>
  )
}

const UserChecker=({...props})=>{
  return(
    <div>
      <InputWithDropDown {...props}/>
      <UserList {...props} />
    </div>
  )
}

class App extends Component {
  state ={
    dateTime:{},
    users:[],
    theme:''

  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className = 'form'>
        <InputWithName name="Тема"
           className='text-input'
           onChange={(data)=>this.setState({theme:data.target.value})}
         />
        <DateTime
           className='text-input'
           onInput={(data)=>this.setState({dateTime:data})}
         />
       <UserChecker
         name={'Участники'}
         className='text-input'
         data={Mock}
         onInp={(data)=>this.setState({users:[...this.state.users,data]})}
         {...this.state}
       />
      </div>
      </div>
    );
  }
}

export default App;
