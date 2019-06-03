import React, { Component } from 'react';
import {getTrackByIdURL} from '../globalService';
import TamplateComponent from './TemplateComponent';
import { NavLink} from "react-router-dom";
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline';
import IoAndroidBicycle from 'react-icons/lib/io/android-bicycle';
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk';
import Map from './Map';
import axios from 'axios';
import { Card, Navbar, NavDropdown, Nav } from 'react-bootstrap';
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
      updated: false
    }

    this.getTrackById = this.getTrackById.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.viewTrack = this.viewTrack.bind(this)
    this.updateTrack = this.updateTrack.bind(this)
    this.getReports = this.getReports.bind(this)
    // this.onSubmitAddReport = this.onSubmitAddReport.bind(this)
    this.handleChange  = this.handleChange.bind(this)
    this.initialState = this.initialState.bind(this)

  }
  
  componentDidMount() {
    let idOfTrack=this.props.location.idOfTrack;
    console.log(idOfTrack);

    // this.getTrackById("5ca9d94c87d03b340f708ffd");
    this.getTrackById(idOfTrack);
  // user session
  this.userid = JSON.parse(sessionStorage.getItem('userDetails'));
  console.log(`Entered <AutoGenerateTrack> componentDidMount(), fetching userid: ${this.userid}`);

  // Get the user details from database
  axios.get(`http://localhost:3000/user/getAccountDetails/${this.userid}`)
    .then(userResponse => {
      this.setState({ userDetails: userResponse.data, loading: false });
      console.log(userResponse.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  getTrackById(trackId){
    fetch(getTrackByIdURL(trackId))
    .then((res) => {        
      return res.json();      
    }).then((data) => { 
      console.log("DATA:");
      console.log(data);       
      var self=this;      
      self.addTrack(data.track._id,data.track.title, data.track.type, data.track.difficultyLevel.star, data.reports, data.userDetails,
        data.startPoint, data.endPoint, data.wayPoints, data.track.description);        
    })

  }

  addTrack(_id,_title,_type, _difficultyLevel, _reports,_userDetails,_startPoint, _endPoint, _wayPoints, _description) {
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
          description: _description,
          difficultyLevel: _difficultyLevel
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
      html.push(
        <ul class="media-list">
          <li class="media">
              <img class="media-object img-circle" src={userDetails[i].profilePicture} alt="profile"></img>
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

    if(wayPoints.length !== 0){
      for (let i = 0; i < wayPoints.length; i++) {
        html.push(<p style={{fontSize: '15px'}}> &#9; point number: {i}</p>)
        html.push(<p>	&#8227; &#9;latitude: {wayPoints[i].latitude}</p>)
        html.push(<p>	&#8227; &#9;longitude: {wayPoints[i].longitude}</p>)
      }
    }
    return html;
  }

  getIconType(type){
    if(type === 'Walking')
      return <MdDirectionsWalk size={20} color="black" />;
    else
      return <IoAndroidBicycle size={20} color="black" />;
     
  }

  initialState(){
    this.setState(prevState => ({tracks: []}))
  }

  // async onSubmitAddReport(e){
  //   e.preventDefault();

  //    // TODO: how to get user Id here
  //   let data1 = {userId:`${this.state.userDetails._id}`, report: `${this.state.addReport}` };
  //   var reportId = await PostAsyncRequest('reports/insertReport', data1);

  //    let data2 = {trackId:`${this.props.location.idOfTrack}`, reportId: `${reportId}` };
  //    console.log("DATA2:");
  //    console.log(data2);
  //   var reportId = await PostAsyncRequest('track/addReportToTrack', data2);
    
  //   this.initialState();
  //   this.getTrackById(this.props.location.idOfTrack);
  // }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value})
  }

  getStarsForDifficultyLevel(diffLever){
    let html=[];
    let limitOfStars = 5;
    let diffNumber = Math.round(diffLever);

    for (let i = 0; i < limitOfStars; i++) {
      if(i < diffNumber)
        html.push(<span class="fa fa-star colorStar"></span>)
      else
        html.push(<span class="fa fa-star"></span>)

    }
    return html;
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


      <div className="col-12" style={{margin:'auto'}}>
        <NavLink to=
        //navigate to TrackDetails via TemplateComponent with the params
        {{pathname: `${process.env.PUBLIC_URL}/trackDetails`, 
          idOfTrack: track.idOfTrack}}
          activeStyle={this.active} 
          style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
          className="btn btn-primary" >Start Navigator</NavLink>
      </div>

      <div className="col-12" style={{margin:'auto'}}>
      <NavLink to=
      //navigate to TrackDetails via TemplateComponent with the params
      {{pathname: `${process.env.PUBLIC_URL}/post`, 
        idOfTrack: track.idOfTrack,
        actualTime:45}}
        activeStyle={this.active} 
        style={{padding:'6px', marginTop:'15px',verticalAlign:'middle'}}
        className="btn btn-primary" >Post Navigator</NavLink>
    </div>

          <div className="col-12 px-4">

          <TamplateComponent key={'track'+i} index={i} onChange={this.updateTrack}>  
            <h1 className="card-title title" style={{ textAlign:`center`, marginTop: '20px'}}>{track.title}</h1>
            <p className="typeTrack">{this.getIconType(track.travelMode)}</p>
            <p className="descriptionTrack"><br></br>{track.description}</p>
            <p>{this.getStarsForDifficultyLevel(track.difficultyLevel)}</p>


              <div class="row">
                <div class="col-sm-12 col-md-5" id="logout" style={{ margin:`20px auto`}}>
                    
                    <div class="report-tabs">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="active"><a href="#reports-logout" role="tab" data-toggle="tab"><h4 class="reviews text-capitalize">Reports</h4></a></li>
                        </ul>            
                        <div class="tab-content">
                            <div class="tab-pane active" id="reports-logout">  
                              {this.getReports(track.reports,track.userDetails)}
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