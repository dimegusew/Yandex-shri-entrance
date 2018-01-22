import React, { Component } from "react";
import "./InputField.css";
import InputMask from "react-input-mask";
import TimeInput from "react-time-input";
import MaskedInput from "react-text-mask";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./ModuleCalendar.css";
import calendar from "./images/calendar.svg";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import "moment/locale/ru";

class InputField extends Component {
  constructor(props) {
    super(props);
    // let xx= this.props.id==="date" ? this.props.value : xx
    this.state = {
      isClicked: false,
      selectedDay: this.props.value,
      isDisabled: false
    };
  }

  onFocus = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
  };
  onBlur = () => {
    this.setState({
      isClicked: false
    });
  };
  onMouseClick = () => {
    this.setState({
      isClicked: false
    });
  };

  handleDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled === true
    });
  };

  render() {
    const { selectedDay, isDisabled } = this.state;
    let style = this.state.isClicked
      ? { display: "block" }
      : { display: "none" };
    let width = { width: this.props.width };

    return (
      <div className="text-input">
        <p>{this.props.title}</p>

        {this.props.type === "time" ? (
          <MaskedInput
            mask={[/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]}
            guide={false}
            id={this.props.id}
            onChange={this.props.onChange}
            style={width}
            value={this.props.value}
            placeholder={this.props.placeholder}
          />
        ) : this.props.type === "text" ? (
          <div>
            {this.props.isButtonActive ? (
              <img
                src={this.props.img}
                className="Img"
                onClick={this.props.inputButtonHandler}
                onFocus={this.props.onFocusHandler}
              />
            ) : (
              ""
            )}

            <input
              type={this.props.type}
              id={this.props.id}
              placeholder={this.props.placeholder}
              onFocus={this.onFocus}
              onChange={this.props.onChange}
              value={this.props.value}
              style={width}
            />
          </div>
        ) : (
          <div>
            <img src={calendar} className="calendar-img" />
            <DayPickerInput
              type={this.props.type}
              canChangeMonth={false}
              id={this.props.id}
              style={width}
              formatDate={formatDate}
              format="LL"
              parseDate={parseDate}
              onDayChange={this.props.onChange}
              value={this.state.selectedDay}
              placeholder={`${formatDate(new Date(), "LL", "ru")}`}
              dayPickerProps={{
                locale: "ru",
                localeUtils: MomentLocaleUtils
              }}
            />
          </div>
        )}

        <div style={style} onClick={this.onMouseClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default InputField;
