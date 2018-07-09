import React from "react";
import moment from "moment";
import "moment/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import InputWithName from "../Components/Input.js";
import DatePickerWithName from "../Components/MyDatePicker.js";
import gql from "graphql-tag";
import "moment/locale/ru";
import { graphql, compose, Query } from "react-apollo";
import GET_DATE_TIME from "../Querys/LocalQuerys/getDateTime.js";

const validateTime = dat => {
  return dat.target.value.length < 6 && +dat.target.value.slice(0, 1) < 24
    ? true
    : false;
};

const addColon = dat => {
  return dat.length === 2 && dat.indexOf(":") === -1 ? dat + ":" : dat;
};

const DateTime = ({ ...props }) => {
  const { data, mutate } = props;
  let dateStart = moment(data.dateTime.dateStart);
  return (
    <div className="date-time-input">
      <DatePickerWithName
        className="date-input"
        name="Дата"
        dateTime={dateStart}
        onChange={data =>
          mutate({
            variables: {
              changedForm: {
                ...props.data.dateTime,
                dateStart: moment(data).format()
              }
            }
          })
        }
      />

      <InputWithName
        className="time-input"
        name="Начало"
        value={data.dateTime.timeStart}
        onChange={data =>
          validateTime(data) &&
          mutate({
            variables: {
              changedForm: {
                ...props.data.dateTime,
                timeStart: addColon(data.target.value)
              }
            }
          })
        }
      />

      <InputWithName
        className="time-input"
        name="Конец"
        value={data.dateTime.timeEnd}
        onChange={data =>
          validateTime(data) &&
          mutate({
            variables: {
              changedForm: {
                ...props.data.dateTime,
                timeEnd: addColon(data.target.value)
              }
            }
          })
        }
      />
    </div>
  );
};

const changeConnectionMutation = gql`
  mutation($changedForm: Object) {
    updateFormState(changedForm: $changedForm) @client
  }
`;

const DateTimeWiithData = ({ ...props }) => (
  <Query query={GET_DATE_TIME}>
    {({ data: { formState } }) => <DateTime {...props} data={formState} />}
  </Query>
);

export default compose(graphql(changeConnectionMutation))(DateTimeWiithData);
