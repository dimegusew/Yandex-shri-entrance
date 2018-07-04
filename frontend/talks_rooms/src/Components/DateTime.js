import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import InputWithName from "./Input.js";
import DatePickerWithName from "./MyDatePicker.js";
import gql from 'graphql-tag';
import "moment/locale/ru";
import { graphql, compose, Query } from "react-apollo";
import GET_DATE_TIME from '../Querys/LocalQuerys/getDateTime.js'


const changeConnectionMutation = gql`
  mutation($changedForm: Object) {
    updateFormState(changedForm: $changedForm) @client
  }
`;

const DateTimeWiithData = ({...props} ) => (
  <Query query={GET_DATE_TIME}>
    {({data:{formState} }) =>
        <DateTime
          {...props}
          data={formState}
        />
    }
  </Query>
);


class DateTime extends Component {

  validateTime=(dat)=>{
    console.log(dat)
    return (dat.target.value.length<6)&& +dat.target.value.slice(0,1)<24 ? true : false
  }

  addColon = (dat)=>{
    return dat.length===2 && dat.indexOf(":")===-1 ? dat+':' : dat
  }

  render() {
    const { dateTime, data, mutate } = this.props;
    let dateStart = moment(data.dateTime.dateStart);
    console.log(this.props.data.dateTime)
    return (
      <div className="date-time-input">
        <DatePickerWithName
          {...this.props}
          className="date-input"
          name="Дата"
          dateTime={dateStart}
          onChange={(data)=>
            mutate({
              variables: {
                changedForm: {
                  ...this.props.data.dateTime,
                  dateStart:moment(data).format()
                }
              }
            })
          }
        />

        <InputWithName
          className="time-input"
          name="Начало"
          value={data.dateTime.timeStart}
          onChange={
            (data)=>this.validateTime(data)&& mutate({
              variables: {
                changedForm: {
                  ...this.props.data.dateTime,
                  timeStart:this.addColon(data.target.value)
                }
              }
            })
        }
        />

        <InputWithName
          className="time-input"
          name="Конец"
          value={data.dateTime.timeEnd}
          onChange={
            (data)=>this.validateTime(data) && mutate({
              variables: {
                changedForm: {
                  ...this.props.data.dateTime,
                  timeEnd:this.addColon(data.target.value)
                }
              }
            })
        }
        />
      </div>
    );
  }
}

export default compose(
  graphql(changeConnectionMutation)
)(DateTimeWiithData);

// export default DateTimeWiithData;
