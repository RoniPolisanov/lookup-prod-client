import React, { Component } from 'react';
import {getTrackByIdURL, PostAsyncRequest} from '../globalService';
import TamplateComponent from './TemplateComponent';
import { NavLink , Link} from "react-router-dom";
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline';
import IoAndroidBicycle from 'react-icons/lib/io/android-bicycle';
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk';
import Map from './Map';
import { Button, Card, Form, Col, Row, Container, Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import './style/TrackDetails.css'

class IntermediatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      userDetails: []
    }

  }
  
  componentDidMount() {
  
  }


  render() {
    
    return (
      <div>

          <Card.Header>
            <Navbar collapseOnSelect expand="lg">

              <Navbar.Brand href="#profilePicture" style={{ float: 'left' }}>
                {this.state.userDetails.profilePicture ?
                  (
                    <img alt="Profile" src={this.state.userDetails.profilePicture} style={{ height: '40px', width: '40px', float: 'left', borderRadius: '50%' }}></img>
                  )
                  :
                  (
                    <div className='sweet-loading'> <BeatLoader color={'#123abc'} /> </div>
                  )
                }
              </Navbar.Brand>

              <Navbar.Brand href="#name" style={{ float: 'center' }}>
                {this.state.userDetails.name ?
                  (
                    <div>
                      <p>{this.state.userDetails.name}</p>
                    </div>
                  )
                  :
                  (
                    <div className='sweet-loading'> <BeatLoader color={'#123abc'} /> </div>
                  )
                }
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              <NavLink to=
                //navigate to TrackDetails via TemplateComponent with the params
                {{pathname: `${process.env.PUBLIC_URL}/profile`}}
                  activeStyle={this.active} 
                  style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
                  >View Profile</NavLink>

                <NavLink to=
                //navigate to TrackDetails via TemplateComponent with the params
                {{pathname: `${process.env.PUBLIC_URL}/favorites`}}
                  activeStyle={this.active} 
                  style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
                  >Favorite Tracks</NavLink>

                <NavLink to=
                //navigate to TrackDetails via TemplateComponent with the params
                {{pathname: `${process.env.PUBLIC_URL}/auto`}}
                  activeStyle={this.active} 
                  style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
                  >Generate Auto Track</NavLink>
                  
                <NavLink to=
                //navigate to TrackDetails via TemplateComponent with the params
                {{pathname: `${process.env.PUBLIC_URL}/choose`}}
                  activeStyle={this.active} 
                  style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
                  >Choose Existing Tracks</NavLink>

                <NavLink to=
                //navigate to TrackDetails via TemplateComponent with the params
                {{pathname: `${process.env.PUBLIC_URL}/custom`}}
                  activeStyle={this.active} 
                  style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
                  >Custom Made Track</NavLink>

              </Nav>
              </Navbar.Collapse>

            </Navbar>
          </Card.Header>
          
          <div className="col-10" style={{margin:'auto', textAlign:'center'}}>
          <NavLink to=
          // button
          {{pathname: `${process.env.PUBLIC_URL}/auto`}}
            activeStyle={this.active} 
            style={{marginTop:'30px',borderRadius:'10px', width:'60%'}}
            className="btn btn-primary" >Auto Generate</NavLink>
        </div>


        <div className="col-10" style={{margin:'auto', textAlign:'center'}}>
        <NavLink to=
        // button
        {{pathname: `${process.env.PUBLIC_URL}/choose`}}
          activeStyle={this.active} 
          style={{marginTop:'30px',borderRadius:'10px', width:'60%'}}
          className="btn btn-primary" >Choose Existing</NavLink>
      </div>

      </div>
    );
  }
}


export default IntermediatePage;