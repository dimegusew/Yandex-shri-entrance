import React from 'react';
import AddName from '../HOC/AddName.js'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({startDateTime,...props})=>{
  return(
    <DatePicker
       selected={startDateTime.date}
       {...props}
       locale="ru"
       dateFormat="DD MMMM YYYY"
       minDate={moment()}
       maxDate={moment().add(5, "months")}
   />
  )
}

export default AddName(MyDatePicker);
// export default AddName(MyDatePicker);
