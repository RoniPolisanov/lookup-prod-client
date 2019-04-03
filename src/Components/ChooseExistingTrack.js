import React, { Component } from 'react';
import TamplateComponent from './TemplateComponent'
import './style/AutoGenerateTrack.css';
import IoAndroidBicycle from 'react-icons/lib/io/android-bicycle';
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk';
import {getAllTracksURL, getTracksByCityURL} from '../globalVariables'
import { NavLink , Link} from "react-router-dom";
import ReactDOM from 'react-dom';



class ChooseExistingTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []

      
    }

    this.addTracks = this.addTracks.bind(this)
    this.viewTracks = this.viewTracks.bind(this)
    this.updateTracks = this.updateTracks.bind(this)
    this.getAllTracks = this.getAllTracks.bind(this)
    this.getComments = this.getComments.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleChange  = this.handleChange.bind(this)

  }
  
  onSubmit(e){

    // e.preventDefault();
    // console.log("VALUES: " + this.state.from + ", " + this.state.to + ", " + this.state.travelers );

    //   this.props.history.push({
    // pathname: "/results",
    // state: this.state
    // });

    e.preventDefault();
    let city = this.state.city;
    console.log("CITY:");
    console.log(city);
    // TODO: parse city to upper case and lower case:
    fetch(getTracksByCityURL(city))
    .then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
      data.map(element => {    
        element.map(json=>{
          console.log(JSON.stringify(json) ); 
          self.addTracksAfterFiltering(json._id,json.title, json.type, json.comment);        
        })
      })    // endOf data.map((data)
      // TODO: how to render react?
      // ReactDOM.render(this.viewTracks(), document.getElementById('root')); 
      // document.getElementById("response").innerHTML = ""
 
    })

  }

  addTracksAfterFiltering(_id,_title,_type, _comment) {
    this.setState(prevState => ({
      tracks: [
      {
          id: this.state.tracks.length + 1,
          idOfTrack: _id,
          title: _title,
          type: _type,
          comment: _comment
      }]
    }))
  }

  onChange(e){
    console.log(this.props.width);
  this.setState({[e.target.name]:e.target.value});
  }

  addTracks(_id,_title,_type, _comment) {
    this.setState(prevState => ({
      tracks: [
      ...prevState.tracks,
      {
          id: this.state.tracks.length + 1,
          idOfTrack: _id,
          title: _title,
          type: _type,
          comment: _comment
      }]
    }))
  }

  updateTracks(newTrack, i) {
    this.setState(() => ({
      tracks: this.state.tracks.map(
        (trck) => (trck.id !== i) ? trck : {...trck, name: newTrack}
      )
    }))
  }
  
  getComments(comments){
    let html=[];
    // Outer loop to create parent
    for (let i = 0; i < comments.length; i++) {
      html.push(<p>	&#8227; &#9;{comments[i]}</p>)
    }
    return html;
  }

  viewTracks(track,i) {
    return (          
      <div key={'container'+i} className="col-10 p-md-4 card" style={{ margin:`0 auto`,width: 18 + 'rem'}}>
          <div className="">
            <TamplateComponent key={'track'+i} index={i} onChange={this.updateTracks}>  

            <NavLink to=
            //navigate to TrackDetails via TemplateComponent with the params
            {{pathname: `${process.env.PUBLIC_URL}/trackDetails`, 
              idOfTrack: track.idOfTrack}}
              activeStyle={this.active} 
              className="" >
              <h1 className="card-title" style={{ textAlign:`center`}}>{track.title} </h1>
              <p style={{ textAlign:`center`}}>type: {track.type}</p>
            </NavLink>

            <div>
              <p>comment: </p>
              <p style={{ border:`groove`,fontSize:'10px'}}>{this.getComments(track.comment)}</p>
            </div>
            
            </TamplateComponent>
        </div>
        
      </div>
    )
  }

  getAllTracks(){
    fetch(getAllTracksURL())
    .then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
      data.map((json) => {   
        // console.log(JSON.stringify(json) );          
        self.addTracks(json._id,json.title, json.type, json.comment);        
          console.log(json);  
      })    // endOf data.map((data)  
    })
  }

  componentDidMount(){
    this.getAllTracks();
  }

  handleChange(event){
    this.setState({city: event.target.value})
  }

  render() {
    return (
      <div className="container">
        <div className ="row">
        <div className="col-12 p-md-4">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              

            <div className="col bg-white rounded">
              <label>City:
              <input className="mt-2 form-control float-left" type="text" name="from" onChange={this.handleChange} value={this.state.city}/>
          </label>
          </div>
          <div className="col bg-white rounded">
              <label>Type:</label>
              <span className="d-block">
                <input className="float-left" type="radio" name="option" id="walking" autocomplete="off" checked /> 
                <MdDirectionsWalk /> 
              </span>
              <span className="d-block">
                <input className="float-left" type="radio" name="option" id="bicycling" autocomplete="off" /> 
                <IoAndroidBicycle /> 
              </span>
              </div> 
        
          <div className="w-100 mb-md-4"></div>
          <div className="col-12 mx-auto">
            <button type="submit" className="mt-2 tn-block btnGreen rounded-0 w-100 btn border-0">search tracks</button>
          </div>

            </div>
          </form>
        </div>
        
        <div className="w-100 mb-md-4 pt-3"></div>
          <div className="col-12 mx-auto">
              {this.state.tracks.map(this.viewTracks)}
		      </div>
        </div>
      </div>
    );
  }
}


export default ChooseExistingTrack;