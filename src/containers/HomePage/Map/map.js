import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import { connect } from "react-redux";

class MapBox extends Component {
  state = {
    viewport: {
      width: "100px",
      height: "100px",
      latitude: 21.0244246,
      longitude: 105.7938072,
      zoom: 16,
    },
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onViewportChange={(viewport) => this.setState(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoibWFuaG5nIiwiYSI6ImNsaHg3ZDloZDA0ajUzZHJzcm9iOWFvOHQifQ.m6J-YfxvBJhKJZqEUiF39g"
      ></ReactMapGL>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(MapBox);
// import React from "react";
// import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap() {
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627,
//     },
//     zoom: 11,
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//       </GoogleMapReact>
//     </div>
//   );
// }
