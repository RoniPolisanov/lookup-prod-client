// import React, { Component } from 'react';
// import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
// import {getGoogleApiKey} from '../globalVariables';


// class DirectionsPoints extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userDetails: null,
//       loading: false,
//       CurrentPosition: {
//         lat: null,
//         lng: null
//       },
//       result: null
//     }
//     //this.directionsService = new DirectionsService();
//     this.DirectionsRenderer = new DirectionsRenderer();
//     this.handleRequest = this.handleRequest.bind(this);

//   }


//   handleRequest = (result) => {
//     console.log(result);
//     if (result !== null) {
//       if (result.status === 'OK') {
//         this.setState({
//           result
//         });
//       } else {
//         console.log('result : ', result)
//       }
//     }
//   }

//   // Remember to replace this method because UNSAFE
//   componentWillMount() {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       this.setState({
//         CurrentPosition: {
//           lat: parseFloat(pos.coords.latitude),
//           lng: parseFloat(pos.coords.longitude)
//         }
//       });
//       console.log(this.state.CurrentPosition.lng);
//       console.log(this.state.CurrentPosition.lat);
//     });

//   }

//   componentDidMount() {

//   };

//   render() {
//     return (
//       <div style={{
//         height: "600px",
//         width: "800px"
//       }}>

//       <LoadScript
//         id="script-loader"
//         googleMapsApiKey={getGoogleApiKey()}
//         onError={() => { "Error" }}
//         onLoad={() => { "Success" }}
//         language="English"
//         region="IL"
//       >

//         <GoogleMap
//           id='example-map'
//           center={{ lat: this.state.CurrentPosition.lat, lng: this.state.CurrentPosition.lng }}
//           clickableIcons={true}
//           mapContainerStyle={{
//             height: "400px",
//             width: "800px"
//           }}
//           zoom={20}
//         >

//           <DirectionsService
//             options={{
//               origin: { lat: 32.0901274, lng: 34.8031728 },
//               destination: { lat: 31.67763494, lng: 34.58624303 },
//               waypoints: [
//                 {
//                   location: { lat: 31.67864841, lng: 34.58581388 }
//                 },
//                 {
//                   location: { lat: 31.67870319, lng: 34.584741 }
//                 }
//               ],
//               travelMode: 'WALKING',
//             }}
//               callback={this.handleRequest}
//           >
//           </DirectionsService>

//           <DirectionsRenderer
//             options={{
//               directions: this.state.result
//             }}
//           >

//           </DirectionsRenderer>

//         </GoogleMap>

//       </LoadScript>

//       </div>
//     );
//   }
// }


// export default DirectionsPoints;
import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import {getGoogleApiKey} from '../globalService';


class DirectionsPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      loading: false,
      CurrentPosition: {
        lat: null,
        lng: null
      },
      result: null
    }
    //this.directionsService = new DirectionsService();
    this.DirectionsRenderer = new DirectionsRenderer();
    this.handleRequest = this.handleRequest.bind(this);

  }


  handleRequest = (result) => {
    console.log(result);
    if (result !== null) {
      if (result.status === 'OK') {
        this.setState({
          result
        });
      } else {
        console.log('result : ', result)
      }
    }
  }

  // Remember to replace this method because UNSAFE
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        CurrentPosition: {
          lat: parseFloat(pos.coords.latitude),
          lng: parseFloat(pos.coords.longitude)
        }
      });
      console.log(this.state.CurrentPosition.lng);
      console.log(this.state.CurrentPosition.lat);
    });

  }

  componentDidMount() {

  };

  render() {
    return (
      <div style={{
        height: "600px",
        width: "800px"
      }}>

      <LoadScript
        id="script-loader"
        googleMapsApiKey={getGoogleApiKey()}
        onError={() => { "Error" }}
        onLoad={() => { "Success" }}
        language="English"
        region="IL"
      >

        <GoogleMap
          id='example-map'
          center={{ lat: this.state.CurrentPosition.lat, lng: this.state.CurrentPosition.lng }}
          clickableIcons={true}
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          zoom={20}
        >

          <DirectionsService
            options={{
              origin: { lat: 32.0901274, lng: 34.8031728 },
              destination: { lat: 31.67763494, lng: 34.58624303 },
              waypoints: [
                {
                  location: { lat: 31.67864841, lng: 34.58581388 }
                },
                {
                  location: { lat: 31.67870319, lng: 34.584741 }
                }
              ],
              travelMode: 'WALKING',
            }}
              callback={this.handleRequest}
          >
          </DirectionsService>

          <DirectionsRenderer
            options={{
              directions: this.state.result
            }}
          >

          </DirectionsRenderer>

        </GoogleMap>

      </LoadScript>

      </div>
    );
  }
}


export default DirectionsPoints;

