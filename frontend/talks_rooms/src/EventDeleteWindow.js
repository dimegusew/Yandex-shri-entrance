import React, { Component } from 'react';
import './EventDeleteWindow.css';
import converter from './converterFromServerTime.js'
import newEmoji from './images/emoji1.svg'


class EventDeleteWindow extends Component {
  onClick=(event)=>{
    console.log(event.target.id)
    this.props.eventDeleteWindowHandler(event.target.id)
  }


  render() {
    // console.log(this.props.dataToEventsCreatedWindow)
    // let data=this.props.dataToEventsCreatedWindow
    // let dateStart = data.date.dateStart;
    // let dateEnd = data.date.dateEnd;
    // let room = data.room.title;
    return (
      <div className="evet-delete-window">

        <div>
          <img src={newEmoji}/>
          <h4>Встреча будет удалена безвозвратно</h4>
          {/* <p>{converter(dateStart).date}, {converter(dateStart).time} - {converter(dateEnd).time}</p>
          <p>{data.room.title} . {data.room.floor + "Этаж"}</p> */}
          <p><button id="cancel" onClick={this.onClick}>Отмена</button>

        <button id="delete" onClick={this.onClick}>Удалить</button></p>

        </div>
    </div>

    );
  }
}

export default EventDeleteWindow
