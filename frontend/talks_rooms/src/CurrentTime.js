import React, { Component } from 'react';

class CurrentTime extends Component {
  constructor(props){
    super(props)
    this.state={
      date : new Date(),
      pointerPosition : this.getPosition(new Date())
    }
  }

  getPosition(time){
    let minutes=time.getHours()*60+time.getMinutes();
    return (minutes-470)*0.11111;
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
  )}

  componentWillUnmount() {
   clearInterval(this.timerID);
 }

   tick() {
   this.setState({
     date: new Date(),
     pointerPosition : this.getPosition(this.state.date)
   });
  }

  render() {
    let date=this.state.date;
    let time=date.getHours()+':'
    + (date.getMinutes()<10 ? ("0"+date.getMinutes()) : date.getMinutes());
    let myStyle={left: this.state.pointerPosition+"%"};
    return (
      <div>
      <div className="current-time" style={myStyle}><p>{time}</p>
      <div className="vert-line"></div></div>
    </div>
    )
  }
}

export default CurrentTime;
