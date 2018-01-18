import React, { Component } from 'react';
import CancelButton from './CancelButton';
import './BottomBar.css';
import {Link} from 'react-router-dom';
import Push from './Push.js'
import EditEventPush from './EditEventPush.js'
import DeleteEvent from './DeleteEvent.js'
import PushWithReplace from './PushWithReplace.js'


class BottomBar extends Component {
  render() {

    console.log("yaaas")
    console.log(this.props.dataToServer.roomSwap)
    let needToRoomSwap = this.props.dataToServer.roomSwap ? true :false
    console.log(needToRoomSwap)
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
           :
            <div>
              {needToRoomSwap ?

                   <PushWithReplace dataToServer={this.props.dataToServer}
                        formValid={this.props.formValid}
                       onClick={this.props.createHandler}  //callback to App.js
                       allRooms={this.props.allRooms}
                     />
                     :
                     <Push dataToServer={this.props.dataToServer}
                          formValid={this.props.formValid}
                         onClick={this.props.createHandler}  //callback to App.js
                         allRooms={this.props.allRooms}
                       />
      }

            </div>




            }
      </div>
    );
  }
}




export default BottomBar;
