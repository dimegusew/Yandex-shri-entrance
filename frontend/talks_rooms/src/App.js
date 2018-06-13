import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from './Components/DateTime.js';
import InputWithName, {InputWithDropDown} from './Components/Input.js'

const Mock = [
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2
    }
  ];



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className = 'form'>
        <InputWithName name="Тема" className='text-input'/>
        <DateTime className='text-input' onChange={(data)=>console.log(data)}/>
        <InputWithDropDown name={'Участники'} data={Mock}/>
      </div>
      </div>
    );
  }
}

export default App;
