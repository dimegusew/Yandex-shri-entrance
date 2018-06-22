import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import InputWithName from './Input.js'
import DatePickerWithName from './MyDatePicker.js'


class DateTime extends Component {
   state = {
     dateTime: {date:moment(),
                time: {start:moment().format('LT'),
                        end:moment().add(30, 'minutes').format('LT') }}
   };

 render() {
   const {dateTime} = this.state;
   return(
     <div className='date-time-input'>

   <DatePickerWithName
      {...this.props}
      className='date-input'
      name = "Дата"
      dateTime={dateTime}
      onChange={(date)=> {this.setState(
        {dateTime: {...dateTime,date}
      },
      this.props.onInput(this.state)
    )}}
   />

   <InputWithName
      className='time-input'
      name ="Начало"
      value={dateTime.time.start}
      onChange={(dat)=> {
        this.setState(
        {dateTime: {...dateTime,
          time:{...dateTime.time,
            start:dat.target.value}}
      })}}
    />
  <InputWithName
    className='time-input'
     name ="Конец"
     value={dateTime.time.end}
     onChange={(dat)=> {
       this.setState(
       {dateTime: {...dateTime,
         time:{...dateTime.time,
           end:dat.target.value}}
     })}}
   />
</div>
   )
 }
}

export default DateTime;
