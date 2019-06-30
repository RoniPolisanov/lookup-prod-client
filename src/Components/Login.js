import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {getGoogleLoginApiKey} from '../globalService';
import google from './style/Login.css'
import { Modal, Button, Form } from 'react-bootstrap';
import { originURL } from '../globalService';

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            userDetails: null,
            isAccessibility: true,
            accessibility: '1',
            phone: '',
            birthDay: '',
            isLoading: true
        }

        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFail = this.loginFail.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
        this.setAccessibility = this.setAccessibility.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    fetchUserData() {
        console.log("Entered <Login></Login> fetchUserData()")
        let user = this.state.userDetails;
        console.log(user);
        console.log('for user: ' + user.email);
        const url = `${originURL}user/getAccountDetailsByEmail/${user.email}`;

        axios.post(url, {email: user.email, name: user.name, imageUrl: user.imageUrl})
        .then(response => {
            // NotificationManager.success(`${this.state.projectToAdd.title} has been created successfully`, '', 3000)
            if(response.status === 200){
                console.log(`User ${response.data.email} successfully looged in.`);
                // sessionStorage Can be accessible from any windows and never expires
                sessionStorage.setItem('userDetails', JSON.stringify(response.data._id));
                // localStorage Can be accessible from same tab and expires when tab close
                localStorage.setItem('userDetails', JSON.stringify(response.data._id));

                if(response.data.accessibility !== null){
                    this.props.history.push('/home');
                }
                else{
                    this.setState({ isAccessibility: false })
                }
            }
        })
        .catch(error => {
            console.log(error);
        });

        return;
    }

    loginSuccess(response) {
        console.log("Entered <Login></Login> loginSuccess()")
        this.setState({ userDetails: response.profileObj })
        this.fetchUserData();
    }

    loginFail(response) {
        console.log('Entered <Login></Login> loginFail()');
        NotificationManager.error('Login failed, try again please.', '', 3000, true);
        console.log(response);
    }

    setAccessibility(code){
        alert(code);
    }

    handleInputChange(e){
        e.persist();
        console.log(e);
        e.target.value !== '' &&
          this.setState(
            (prevState) => ({
              ...prevState,
               [e.target.name]: e.target.value,
            }), () => {
              console.log(this.state);
            }
          )
      }
    
    handleRadioChange(e){
    e.persist();
    e.target.checked &&
        this.setState(
        (prevState) => ({
            [e.target.name]: e.target.value
        })
        )
    }

    handleClose(){
        this.setState({
            userDetails: null,
            isAccessibility: true,
            accessibility: false,
            phone: '',
            birthDay: '',
            isLoading: true });
    }
    
    handleSubmit(){
        // const accessibility = !this.state.accessibility ? 0 : 1;
        this.userid = JSON.parse(sessionStorage.getItem('userDetails'));

        const url = `${originURL}user/updateAccountDetails/${this.userid}`;
        axios.put(url, {birthDay: this.state.birthDay, accessibility: this.state.accessibility, phone: this.state.phone})
        .then(response => {
            console.log(response);
            this.props.history.push('/home');
        })
        .catch(error => {
            console.log(error);
        });
    }

    accessibilityModal(){
      return(
        <div>
        <Modal 
          show={!this.state.isAccessibility} 
          onHide={ () => { this.setState({ isAccessibility: true })}}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
          <Modal.Header closeButton>
              <Modal.Title>One more moment and we're off...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ display: 'block'}}>
              <img alt="Profile" src={this.state.userDetails.imageUrl} style={{ height: '34px', width: '34px', borderRadius: '50%', display: 'block', margin: '0 auto'}}></img>
              <h5 style={{ textAlign: 'center'}}> Hello, {this.state.userDetails.name} </h5>
          </div>
          
          <div style={{ display: 'block', marginTop: '25px'}}>
              <h6>Please fill out the following fields: </h6>
              <Form.Group controlId="formBirthDay">
                  <Form.Control required type="text" placeholder="Enter Birthday Date" value={this.state.birthDay} name="birthDay" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                  <Form.Control required type="tel" placeholder="Enter Phone Number" value={this.state.phone} name="phone" onChange={this.handleInputChange}/>
              </Form.Group>
              <Form.Group controlId="formAccessibility">
                  <Form.Check custom inline id="formNotDisabled" type="radio" label="Not-Disabled" name="accessibility" checked={this.state.accessibility === '1'} value='1' onChange={this.handleRadioChange}/>
                  <Form.Check custom inline id="formDisabled" type="radio" label="Disabled" name="accessibility" checked={this.state.accessibility === '2'} value='2' onChange={this.handleRadioChange}/>
              </Form.Group>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSubmit}>
                I'm Done
              </Button>
          </Modal.Footer>
        </Modal>
        </div>
      )
    }

    render() {
        return (
            <div id="root">
                <NotificationContainer />
                {!this.state.isAccessibility && this.accessibilityModal()}
                <header style={{ textAlign: 'center' }}>
                  <div style={{ height: '350px', width: '100%', border: '2px solid gray', margin: '0 auto'}}> 
                  HEADER
                  </div>                
                </header>
                <div style={{ backgroundImage: `url(./images/logo.png)`, backgroundSize: 'cover', margin: '0 auto', width: '350px', height: '121px', marginTop: '70px' }}>
                </div>
                <p style={{ marginTop: '50px' }}></p>
                <div style={{ textAlign: 'center' }}>
                    <h1> Welcome to Look Up - Vibrating Navigation </h1>
                    An alternative navigation system which provides the user with safe directions by vibrations <br />
                    that are transmitted in real time directly from the mobile phone to our special bracelet. <br />

                    The system will provide a safe solution for navigating an urban area by means of a non-motorized vehicle, <br />
                    from place of origin to destination without user distraction. <br />

                    <div style={{ height: '350px', width: '350px', border: '2px solid gray', margin: '0 auto', marginTop: '40px'}}> 
                      VIDEO
                    </div>

                    <h6 style={{ display: 'block', marginTop: '40px'}}>Supported Browsers:
                    </h6>                 
                    <div style={{ backgroundImage: `url(./images/supportedBrawsers.png)`, backgroundSize: 'cover', margin: '0 auto', height: '70px', width: '350px'}}><br/>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'inline'}}>
                      <li> 50.0+ </li>
                      <li> 3.5+ </li>
                      <li> 9.0+ </li>
                      <li> 16.0+ </li>
                      <li> 5.0+ </li>
                    </ul>

                </div>
                <div style={{ marginTop: '40px' }} className="d-flex justify-content-center">
                    <GoogleLogin
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="loginBtn loginBtn--google">
                                Login with Google
                            </button>
                        )}
                        clientId={getGoogleLoginApiKey()}
                        buttonText="Login"
                        onSuccess={this.loginSuccess}
                        onFailure={this.loginFail}>
                    </GoogleLogin>
                </div>
                <footer style={{ textAlign: 'center' }}>
                  <div style={{ height: '350px', width: '100%', border: '2px solid gray', margin: '0 auto', marginTop: '40px'}}> 
                  FOOTER
                  </div>
                </footer>
            </div>
        )
    }
}

export default Login;