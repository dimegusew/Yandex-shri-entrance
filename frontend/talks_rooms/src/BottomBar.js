import React, { Component } from 'react';
import CancelButton from './CancelButton';
import './BottomBar.css';
import {Link} from 'react-router-dom';
import Push from './Push.js'
import EditEventPush from './EditEventPush.js'


class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <CancelButton text={"Отмена"} cancelHandler={this.props.cancelHandler}/>
        {this.props.isEditedPage ?
              <span>
             <CancelButton width={"140px"} text={"Удалить встречу"}/>
             <EditEventPush
               eventToEdit={this.props.eventToEdit}
               dataToServer={this.props.dataToServer}
               onClick={this.props.eventEditedHandler}

           />
           </span>
           :   <Push dataToServer={this.props.dataToServer}
               onClick={this.props.createHandler}
               allRooms={this.props.allRooms}

             />

            }
      </div>
    );
  }
}




export default BottomBar;
