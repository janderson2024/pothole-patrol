import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';


const carMarkerIcon = new L.Icon ({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/car-with-sensor/100/Car_Location-512.png',
    iconSize: [100, 100],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

const MapLocations = () => {
  const [location, setLocation] = useState({lat: 40.47470736152738, lng: -80.06415069160637});
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log('Location error: ', error);
        alert("You must accept the location request for this app to work. Thank You. -Pothole Patrol");
      },
    );
  }, []);

  return (
    <MapContainer className='map-container' center={location} zoom={18} scrollWheelZoom={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location} icon={carMarkerIcon} />
    </MapContainer>
  );
};

export default MapLocations;
