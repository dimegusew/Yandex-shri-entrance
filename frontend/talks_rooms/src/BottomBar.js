import React, { Component } from 'react';
import CancelButton from './CancelButton';
import './BottomBar.css';
import {Link} from 'react-router-dom';
import Push from './Push.js'
import EditEventPush from './EditEventPush.js'
import DeleteEvent from './DeleteEvent.js'


class BottomBar extends Component {
  render() {
    return (
      <div className="bottom-bar">
        <CancelButton text={"Отмена"} cancelHandler={this.props.cancelHandler}/>
        {this.props.isEditedPage ?
              <span>
              <DeleteEvent
                deleteIsPermitted={this.props.deleteIsPermitted}
                eventToDelete={this.props.eventToEdit}
                eventDeletedHandler={this.props.eventDeletedHandler} //callback to App.js
              />

               <EditEventPush
                 eventToEdit={this.props.eventToEdit}
                 dataToServer={this.props.dataToServer}
                 onClick={this.props.eventEditedHandler}   //callback to App.js

           />
           </span>
           :   <Push dataToServer={this.props.dataToServer}
                formValid={this.props.formValid}
               onClick={this.props.createHandler}  //callback to App.js
               allRooms={this.props.allRooms}
             />

            }
      </div>
    );
  }
}




export default BottomBar;
