import React, { Component } from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from './Components/DateTime.js';
import InputWithName from './Components/Input.js'
import Mock from './MockUsers.js'
import UserChecker from './Components/Userchecker.js';

class App extends Component {
  state ={
    dateTime:{},
    users:[],
    theme:''
  }

  setUser = (data,userLogin) =>{
    return(
      data.find(el=>el.login===userLogin)
    )
  }

  deleteUser = (data,userLogin) =>{
    return(
      data.filter(el=>el.login !== userLogin)
    )
  }

  render() {
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
         onDeleteClick={(data)=>
           this.setState({users: this.deleteUser(this.state.users,data.target.id)})
         }
         onInp={(data)=>
           this.setState({users:[...this.state.users,this.setUser(Mock,data)]})
         }
         {...this.state}
       />
      </div>
      </div>
    );
  }
}

export default App;
