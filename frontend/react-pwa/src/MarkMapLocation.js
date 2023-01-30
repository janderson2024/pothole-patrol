import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useHistory } from 'react-router-dom';
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import { Button } from '@mui/material';

const MarkMapLocation = () => {
  const [location, setLocation] = useState({ lat: 40, lng: -80 });
  const [haveUsersLocation, setHaveUsersLocation] = useState(false);
  const [zoom, setZoom] = useState(13);
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
//   const history = useHistory();
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setMarkerCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setHaveUsersLocation(true);
    }, () => {
      console.log('Error in getting location');
    });
  }, []);

  const handleMarkerDrag = (e) => {
    setMarkerCoords({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    });
  }

  const handleLogLocation = async () => {
    const coordinates = {
      latitude: markerCoords.lat,
      longitude: markerCoords.lng,
    }

    //TODO: switch frontend_test to be report_pothole once code is finished
    // const response = await fetch("./api/frontend_test", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(coordinates),
    // });
    // const resp = await response.json();
    // console.log(resp);
    
    // Send markerCoords to backend MySQL database
    console.log(`Marker Coordinates: ${markerCoords.lat}, ${markerCoords.lng}`);
    // navigate to a different page using history.push
    // history.push('/');
  }

  return (
    <div>
      <div>
      
        <MapContainer className='map-container' center={[location.lat, location.lng]} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {haveUsersLocation ?
            <Marker position={[location.lat, location.lng]} draggable={true} onDragEnd={handleMarkerDrag}>
              <Popup><Button variant="contained" color="primary" onClick={handleLogLocation}>Log my location</Button></Popup>
            </Marker> : ''
          }
        </MapContainer>
        
      </div>
    </div>
  );
}

export default MarkMapLocation;