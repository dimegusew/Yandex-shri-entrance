import React, { Component } from 'react';
import './App.css';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from './Components/DateTime.js';
import Mock from './MockUsers.js'
import UserChecker from './Components/Userchecker.js';
import {InputWithClearButton} from './Components/Input.js';
// import gql from "graphql-tag";
import Header from './Components/Header.js'


class Form extends Component {
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
      <div className = 'form'>
      <Header/>
      <InputWithClearButton name="Тема"
        placeholder={'О чем будете говорить?'}
         className='text-input'
         onChange={(data)=>this.setState({theme:data.target.value})}
       />
      <DateTime
         onInput={(data)=>this.setState({dateTime:data})}
       />
     <UserChecker
       onDeleteClick={(data)=>
         this.setState({users: this.deleteUser(this.state.users,data.target.id)})
       }
       onInp={(data)=>
         this.setState({users:[...this.state.users,this.setUser(Mock,data)]})
       }
       {...this.state}
     />
    </div>
  )
  }
}

export default Form;
