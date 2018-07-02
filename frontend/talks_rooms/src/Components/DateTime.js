import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import InputWithName from "./Input.js";
import DatePickerWithName from "./MyDatePicker.js";
import gql from 'graphql-tag';
import "moment/locale/ru";
import { graphql, compose, Query } from "react-apollo";


const GET_DATE_TIME = gql`
  query {
    formState @client{
      dateTime{
        dateStart,
        dateEnd
      }
    }
    networkStatus @client {
      isConnected
      }
  }
`;


const changeConnectionMutation = gql`
  mutation($changedForm: Object) {
    updateFormState(changedForm: $changedForm) @client
  }
`;

const DateTimeWiithData = ({...props} ) => (
  <Query query={GET_DATE_TIME}>
    {({data:{formState, networkStatus} }) =>
        <DateTime
          {...props}
          data={formState}
          networkStatus={networkStatus}

        />
    }
  </Query>
);




class DateTime extends Component {

  validateTime=(dat)=>{
    return (dat.target.value.length<6)&& +dat.target.value.slice(0,1)<24 ? true : false
  }

  addColon = (dat)=>{
    return dat.length===2 && dat.indexOf(":")===-1 ? dat+':' : dat
  }



  render() {
    // console.log(moment(data.dateTime.dateStart).format('DD MMMM YYYY'))
    const { dateTime, data, mutate,networkStatus } = this.props;
    let dateStart = moment(data.dateTime.dateStart);
    let dateEnd = moment(data.dateTime.dateEnd);
    console.log(this.props.data.dateTime)
    return (
      <div className="date-time-input">
        <DatePickerWithName
          {...this.props}
          className="date-input"
          name="Дата"
          dateTime={dateStart}
          onChange={date => {
            this.props.changeDate({ ...dateTime, date });
          }}
        />

        <InputWithName
          className="time-input"
          name="Начало"
          value={dateStart.format('LT')}
          onChange={dat => {

            this.validateTime(dat)&&
            this.props.changeDate({
              ...dateTime,
              time: {
                ...dateTime.time,
                start: this.addColon(dat.target.value)
              }
            });
          }}
        />

        <InputWithName
          className="time-input"
          name="Конец"
          value={dateEnd.format('LT')}
          onChange={

            (data)=>this.validateTime(data)&& mutate({
              variables: {
                changedForm: {
                  ...this.props.data.dateTime,
                  dateEnd:data.target.value
                }
              }
        })
          //   dat => {
          //   (this.validateTime(dat)) && //change to validate method
          //   this.props.changeDate({
          //     ...dateTime,
          //     time: {
          //       ...dateTime.time,
          //       end: this.addColon(dat.target.value)
          //     }
          //   })
          // }
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
