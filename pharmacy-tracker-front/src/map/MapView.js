import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MapView extends Component {
  render() {
    const styleMap = { "width": "50%", "height": "50vh", "margin": "5%" }
    return (
        <div>
            <MapContainer
                style={styleMap}
                center={[28.073082, -15.452178,]}
                zoom={13}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </MapContainer>
        </div>
      
    )
  }

}

export default MapView;