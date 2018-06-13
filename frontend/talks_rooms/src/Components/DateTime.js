import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-text-mask';
import InputWithName from './Input.js'
import DatePickerWithName from './MyDatePicker.js'


class DateTime extends Component {
   state = {
     startDateTime: {date:moment(),
                    time: {start:moment().format('LT'),
                            end:moment().add(30, 'minutes').format('LT') }}
   };

 render() {
   const {startDateTime} = this.state;
   this.props.onChange(startDateTime)
   return(
     <div className='date-time-input'>

   <DatePickerWithName
      {...this.props}
      name = "Дата"
      startDateTime={startDateTime}
      onChange={(date)=> {this.setState(
        {startDateTime: {...startDateTime,date}
      })}}
   />

   <InputWithName
      className='time-input'
      name ="Начало"
      value={startDateTime.time.start}
      onChange={(dat)=> {
        this.setState(
        {startDateTime: {...startDateTime,
          time:{...startDateTime.time,
            start:dat.target.value}}
      })}}
    />
  -
  <InputWithName
    className='time-input'
     name ="Конец"
     value={startDateTime.time.end}
     onChange={(dat)=> {
       this.setState(
       {startDateTime: {...startDateTime,
         time:{...startDateTime.time,
           end:dat.target.value}}
     })}}
   />
</div>
   )
 }
}

export default DateTime;
