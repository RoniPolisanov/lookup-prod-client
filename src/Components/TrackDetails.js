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

class TrackDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      startPoint: [],
      userDetails: [],
      endPoint: [],
      wayPoints: [],
      travelMode: [],
      reports: [],
      userDetails: [],
      updated: false
    }

    this.getTrackById = this.getTrackById.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.viewTrack = this.viewTrack.bind(this)
    this.updateTrack = this.updateTrack.bind(this)
    this.getReports = this.getReports.bind(this)
    this.onSubmitAddReport = this.onSubmitAddReport.bind(this)
    this.handleChange  = this.handleChange.bind(this)
    this.initialState = this.initialState.bind(this)

  }
  
  componentDidMount() {
    let idOfTrack=this.props.location.idOfTrack;
    console.log(idOfTrack);

    // this.getTrackById("5ca9d94c87d03b340f708ffd");
    this.getTrackById(idOfTrack);
  }

  getTrackById(trackId){
    fetch(getTrackByIdURL(trackId))
    .then((res) => {        
      return res.json();      
    }).then((data) => { 
      console.log("DATA:");
      console.log(data);       
      var self=this;      
      self.addTrack(data.track._id,data.track.title, data.track.type, data.reports, data.userDetails,
        data.startPoint, data.endPoint, data.wayPoints, data.track.description);        
    })

  }

  addTrack(_id,_title,_type, _reports,_userDetails,_startPoint, _endPoint, _wayPoints, _description) {
    this.setState(prevState => ({
      tracks: [
      ...prevState.tracks,
      {
          id: this.state.tracks.length + 1,
          idOfTrack: _id,
          title: _title,
          travelMode: _type,
          reports: _reports,
          userDetails: _userDetails,
          startPoint:_startPoint,
          endPoint:_endPoint,
          wayPoints:_wayPoints,
          description: _description
      }]
    }))
  }

  updateTrack(newTrack, i) {
    this.setState(() => ({
      tracks: this.state.tracks.map(
        (trck) => (trck.id !== i) ? trck : {...trck, name: newTrack}
      )
    }))
  }

  getReports(reports, userDetails){
    let html=[];
    console.log(reports);
    // Outer loop to create parent
    for (let i = 0; i < reports.length; i++) {
      // html.push(<p>	&#8227; &#9;{reports[i].report}</p>)

      html.push(
        <ul class="media-list">
          <li class="media">
            <a class="pull-left" href="#">
              <img class="media-object img-circle" src={userDetails[i].profilePicture} alt="profile"></img>
            </a>
            <div class="media-body">
              <div class="well well-lg">
                  <h5 class="media-heading text-uppercase nameTitle">{userDetails[i].name}</h5>
                  <p class="media-report">
                    {reports[i].report}
                  </p>
              </div>              
            </div>
          </li> 
        </ul> 
      );
    }
    return html;
  }

  getStartPoint(startPoint){
    let html=[];
    console.log(`startPoint: ${startPoint}`);
    console.log(startPoint);

      html.push(<p>	&#8227; &#9; latitude: {startPoint.latitude}</p>)
      html.push(<p>	&#8227; &#9; longitude: {startPoint.longitude}</p>)
    return html;
  }

  getEndPoint(endPoint){
    let html=[];
    console.log(`endPoint: ${endPoint}`);
    console.log(endPoint);

    html.push(<p>	&#8227; &#9; latitude: {endPoint.latitude}</p>)
    html.push(<p>	&#8227; &#9; longitude: {endPoint.longitude}</p>)
    return html;
  }

  getWayPoints(wayPoints){
    let html=[];
    console.log(`wayPoints: ${wayPoints}`);

    if(wayPoints.length != 0){
      for (let i = 0; i < wayPoints.length; i++) {
        html.push(<p style={{fontSize: '15px'}}> &#9; point number: {i}</p>)
        html.push(<p>	&#8227; &#9;latitude: {wayPoints[i].latitude}</p>)
        html.push(<p>	&#8227; &#9;longitude: {wayPoints[i].longitude}</p>)
      }
    }
    return html;
  }

  getIconType(type){
    if(type == 'Walking')
      return <MdDirectionsWalk size={20} color="black" />;
    else
      return <IoAndroidBicycle size={20} color="black" />;
     
  }

  initialState(){
    this.setState(prevState => ({tracks: []}))
  }

  async onSubmitAddReport(e){
    e.preventDefault();

     // TODO: how to get user Id here
    let data1 = {userId:"5c978235efd9d315e8d7a0d9", report: `${this.state.addReport}` };
    var reportId = await PostAsyncRequest('reports/insertReport', data1);

     let data2 = {trackId:`${this.props.location.idOfTrack}`, reportId: `${reportId}` };
     console.log("DATA2:");
     console.log(data2);
    var reportId = await PostAsyncRequest('track/addReportToTrack', data2);
    
    this.initialState();
    this.getTrackById(this.props.location.idOfTrack);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value})
  }

  viewTrack(track,i) {
    console.log("TRACKKKKKKKKKKK _____________________");
    console.log(track);
    return (          
      <div key={'container'+i}>

        <div className="col-10 p-md-4">
        <NavLink to=
        //navigate to TrackDetails via TemplateComponent with the params
        {{pathname: `${process.env.PUBLIC_URL}/choose`}}
          activeStyle={this.active} 
          style={{padding:'6px', verticalAlign:'baseline'}}
          className="tring" >
          <TiArrowBackOutline size={29} color='black'/></NavLink>
      </div>


      <div className="col-10" style={{margin:'auto'}}>
        <NavLink to=
        //navigate to TrackDetails via TemplateComponent with the params
        {{pathname: `${process.env.PUBLIC_URL}/trackDetails`, 
          idOfTrack: track.idOfTrack}}
          activeStyle={this.active} 
          style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
          className="btn btn-primary" >Start Navigator</NavLink>
      </div>

          <div className="col-10 p-md-4" style={{ margin:`0 auto`,width: 18 + 'rem'}}>

          <TamplateComponent key={'track'+i} index={i} onChange={this.updateTrack}>  
            <h1 className="card-title title" style={{ textAlign:`center`, marginTop: '20px'}}>{track.title}</h1>
            <p className="typeTrack">{this.getIconType(track.travelMode)}</p>
            <p className="descriptionTrack"><br></br>{track.description}</p>

              <div class="row">
                <div class="col-sm-10 col-sm-offset-1" id="logout">
                    
                    <div class="report-tabs">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="active"><a href="#reports-logout" role="tab" data-toggle="tab"><h4 class="reviews text-capitalize">Reports</h4></a></li>
                        </ul>            
                        <div class="tab-content">
                            <div class="tab-pane active" id="reports-logout">  
                              {this.getReports(track.reports,track.userDetails)}
                            </div>  
                            

                            <div class="col-sm-10 col-sm-offset-1 pt-2"> 
                            <ul class="nav nav-tabs" role="tablist">
                              <li class="active"><a href="#reports-logout" role="tab" data-toggle="tab"><h4 class="addReport text-capitalize">Add report</h4></a></li>
                            </ul> 
                
                            <div class="tab-pane" id="add-report">
                              <form onSubmit={this.onSubmitAddReport}> 
                                  <div class="form-group">
                                      <div class="col-sm-10">
                                        <textarea className="form-control textareaSize" name="addReport" onChange={this.handleChange}  value={this.state.addReport} rows="5"></textarea>
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <div class="col-sm-offset-2 col-sm-10">                    
                                          <button className="btn btn-success btn-circle text-uppercase" type="submit" id="submitReport"><span class="glyphicon glyphicon-send"></span> Submit report</button>
                                      </div>
                                  </div>            
                              </form>
                            </div>
                          </div>

                        </div>
                    </div>
              </div>
            </div>

          </TamplateComponent>

          <div style={{paddingBottom:'20px'}}>
          {console.log("AAALLLAA:")}
          {console.log(track)}
            <Map track={track}></Map>
          </div>
        </div>
      </div>
    )
  }

  render() {
    
    return (
      <div>
        <Card className="text-center">

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
                  <Nav.Link href="#profile">View Profile</Nav.Link>
                  <Nav.Link href="#favoriteTracks">Favorite Tracks</Nav.Link>
                  <NavDropdown title="Navigate a Route" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/2.1">Choose Existing Track</NavDropdown.Item>
                    <NavDropdown.Item href="#action/2.2">Generate Auto Track</NavDropdown.Item>
                    <NavDropdown.Item href="#action/2.3">Custom Made Track</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/2.4">Info</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#searcgTracks">Serach Tracks</Nav.Link>
                  <Nav.Link href="#vibrations">Vibrations</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                  <Nav.Link href="#contact">Contact us</Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </Card.Header>
          {this.state.tracks.map(this.viewTrack)}
          <Card.Footer id="locationUpdate" className="text-muted"></Card.Footer>
        </Card>
      </div>
    );
  }
}


export default TrackDetails;


            // <p className="titles">start point: </p>
            //  <p style={{fontSize:'10px'}}>{this.getStartPoint(track.startPoint)}</p>
            //  <p className="titles">end point: </p>
            //  <p style={{fontSize:'10px'}}>{this.getEndPoint(track.endPoint)}</p>
            //  <p className="titles">middle points: </p>
            //     <p style={{fontSize:'10px'}}>{this.getWayPoints(track.wayPoints)}</p>