import React, { Component } from 'react';
import '../css/SomePage.css';

class somePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className ="row">
          <p> hello SomePage! </p>
        </div>
      </div>
    );
  }
}


export default somePage;