import React, { Component } from 'react';
import '../css/CustomTrack_style.css';

class CustomTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className ="row">
          <p> hello CustomTrack! </p>
        </div>
      </div>
    );
  }
}


export default CustomTrack;