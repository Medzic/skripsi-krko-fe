import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon from '../Asset/map.png';

const KOTA_TEGAL_COORDINATES = [-6.86997, 109.1403];
const KOTA_TEGAL_BOUNDS = [
  [-6.89, 109.11], // Southwest coordinates
  [-6.85, 109.17]  // Northeast coordinates
];


// custom
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const SetBounds = () => {
  const map = useMap();
  map.setMaxBounds(KOTA_TEGAL_BOUNDS);
  map.on('drag', () => {
    map.panInsideBounds(KOTA_TEGAL_BOUNDS, { animate: false });
  });
  return null;
};

const Peta = () => {
  const [markers, setMarkers] = useState([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setMarkers([...markers, newMarker]);

        // Send the data to your database
        axios.post('/api/save-marker', newMarker)
          .then(response => {
            console.log('Marker saved', response);
          })
          .catch(error => {
            console.error('There was an error saving the marker!', error);
          });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={KOTA_TEGAL_COORDINATES}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      maxBounds={KOTA_TEGAL_BOUNDS}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lng]} />
      ))}
      <MapEvents />
      <SetBounds />
    </MapContainer>
  );
}

export default Peta