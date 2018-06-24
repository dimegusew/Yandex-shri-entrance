import React, {Component} from 'react';

const WithClearButton = (InputComponent)=>
class extends Component {
  state={isVisible:false}
  render(){
    return(
      <div className='with-name'>
        {this.state.isVisible &&
          <div onMouseDown={()=>this.setState({isVisible:false},this.props.onClear)}
            style={{'position':'absolute','bottom':'12px',right:'12px'}}
            >
            {'x'}
          </div>}
      <InputComponent
        value={this.state.isVisible ? this.props.theme : ""}
        onFocus={()=>this.setState({isVisible:true})}
        // onClear={}
        {...this.props}
      />
      </div>
    )
  }
}

export default WithClearButton;
