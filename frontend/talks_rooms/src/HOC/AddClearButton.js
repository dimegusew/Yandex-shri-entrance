import React, {Component} from 'react';

const WithClearButton = (InputComponent)=>
class extends Component {
  state={isVisible:false}
  render(){
    return(
      <div className='with-name'>
        {this.state.isVisible &&
          <div onMouseDown={()=>this.setState({isVisible:false})}
            style={{'position':'absolute','bottom':'12px',right:'12px'}}
            >
            {'x'}
          </div>}
      <InputComponent
        value={this.state.isVisible ? this.props.value : ""}
        onFocus={()=>this.setState({isVisible:true})}
        {...this.props}
      />
      </div>
    )
  }
}

export default WithClearButton;
