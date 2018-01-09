import React, { Component } from 'react';
import './InputField.css'
import InputMask from 'react-input-mask';
import TimeInput from 'react-time-input';
import MaskedInput from 'react-text-mask';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './ModuleCalendar.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/ru';


class InputField extends Component {
  constructor(props){
    super(props)
    this.state={
      isClicked : false,
      selectedDay: undefined,
      isDisabled: false,
    }
  }

  onFocus=()=>{
    this.setState({
      isClicked:!this.state.isClicked
    })
  }
  onBlur=()=>{
    console.log("d")
    this.setState({
      isClicked:false
    })
  }
  onMouseClick=()=>{
    this.setState({
      isClicked:false
    })
  }

  handleDayChange=(selectedDay, modifiers)=>{
   this.setState({
     selectedDay,
     isDisabled: modifiers.disabled === true,
   });
 }


  render() {
    let style= this.state.isClicked ? {"display":"block"} : {"display":"none"}
    let width= {"width" : this.props.width};
    console.log(this.props.type)

    return (
      <div className="text-input">
          <p>{this.props.title}</p>

          {this.props.type==="time" ?
          <MaskedInput
            mask={[ /[1-2]/, /[0-3]/, ':',/[0-5]/, /[0-9]/]}
            guide={false}
            id={this.props.id}
            onChange={this.props.onChange}
            style = {width}
          />
            : this.props.type==="text" ?
          <input
            type={this.props.type}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onFocus={this.onFocus}
            onChange={this.props.onChange}
            value ={this.props.value}
            style = {width}
          />
            :
            <DayPickerInput
              type={this.props.type}
              id={this.props.id}
              style = {width}
                   formatDate={formatDate}
                   parseDate={parseDate}
                   onDayChange={this.props.onChange}
                   value={this.state.selectedDay}
                   placeholder={`${formatDate(new Date(), 'LL', 'ru')}`}
                   dayPickerProps={{
                     locale: 'ru',
                     localeUtils: MomentLocaleUtils,
                   }}
                 />

        }

      <div style={style} onClick={this.onMouseClick}>{this.props.children}</div>
    </div>
    );
  }
}

export default InputField;
