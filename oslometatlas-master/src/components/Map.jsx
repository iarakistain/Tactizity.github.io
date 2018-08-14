import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from './Tooltip'

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9zc2VrYWxsdGVrIiwiYSI6ImNqa3Nhd2I0YTJsdW4zbG1nOXBxN3lqdGsifQ.ARbuJVyZUXEJrsZKn-7jKA';

class Map extends React.Component {
  tooltipContainer;

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
    } else {
      this.tooltipContainer.innerHTML = '';
    }
  }

  componentDidMount() {

    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/fossekalltek/cjknw0k5n5cdj2rpj4ozzy2f3',
      center: [-79.38, 43.65],
      zoom: 1
    });

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0,0]).addTo(map);
    
    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      tooltip.setLngLat(e.lngLat);
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      this.setTooltip(features);
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="absolute custom-map top right left bottom" />
    );
  }
}

export default Map 