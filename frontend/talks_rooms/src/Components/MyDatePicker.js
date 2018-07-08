import React from 'react';
import AddName from '../HOC/AddName.js'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({ dateTime,...props })=>{
  return(
    <DatePicker
       selected={dateTime}
       {...props}
       locale="ru"
       dateFormat="DD MMMM YYYY"
       minDate={moment()}
       maxDate={moment().add(5, "months")}
   />
  )
}
export default AddName(MyDatePicker);
