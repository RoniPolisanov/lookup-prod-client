import React, { Component } from 'react';
//import './style/BLE.css';
//import './style/normalize.css';
import BLEController from './BLEController';

// UI elements.
// const deviceNameLabel = document.getElementById('device-name');

class BLE extends Component {
  constructor(props) {
    super(props);
    this.BLEController = new BLEController();
    
    this.receive = this.receive.bind(this);
    this._log = this._log.bind(this);
    this.send = this.send.bind(this);
    this.connectButton = this.connectButton.bind(this);
    this.disconnectButton = this.disconnectButton.bind(this);
    this.submited = this.submited.bind(this);

  }

  submited = () => {
    console.log(this.refs.inputField.value);
    this.send(this.refs.inputField.value);
    this.refs.inputField.value = '';
    this.refs.inputField.focus();
  }

  // log to console received data from component
  receive = () => {
    this.BLEController.receive = (data) => {
      this.BLEController._log(data);
    };
  }

  // log to console function
  _log = () => {
    this.BLEController._log = (...messages) => {
      messages.forEach((message) => {
        console.log(message);
      });
    }
  }

  // send data to component and log it in the console
  send = (data) => {
    this.BLEController.send(data).
      then(() => this.BLEController._log(data)).
      catch((error) => this.BLEController._log(error));
  };

  // connect button functionallity (open available bluetooth device list)                  
  connectButton = () => {
    this.BLEController.connect();
  };

  // disconnect button functionallity (disconnet component)               
  disconnectButton = () => {
    this.BLEController.disconnect();  
  };

  render() {
    return (
      <div className="app">
        <div className="toolbar">
          <div className="buttons">
            <button id="connect" onClick={this.connectButton} type="button" aria-label="Connect" ref="device-name">
              <i className="material-icons">bluetooth_connected</i>
            </button>
            <button id="disconnect" onClick={this.disconnectButton} type="button" aria-label="Disconnect">
              <i className="material-icons">bluetooth_disabled</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BLE;
