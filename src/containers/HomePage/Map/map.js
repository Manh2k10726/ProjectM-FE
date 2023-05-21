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
        mapboxApiAccessToken="sk.eyJ1IjoibWFuaG5nIiwiYSI6ImNsaHg3emlmODByYjAza3F3b2ZsYm42a2IifQ.shHNpdfF1ZHHXr3cTlOabQ"
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
