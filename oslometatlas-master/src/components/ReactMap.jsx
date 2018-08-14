import {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import React from 'react'

const TOKEN = 'pk.eyJ1IjoiZm9zc2VrYWxsdGVrIiwiYSI6ImNqa3Nhd2I0YTJsdW4zbG1nOXBxN3lqdGsifQ.ARbuJVyZUXEJrsZKn-7jKA'


export default class ReactMap extends Component {


  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL mapboxApiAccessToken={TOKEN} 
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}
