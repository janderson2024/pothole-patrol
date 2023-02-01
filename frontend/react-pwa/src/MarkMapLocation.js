import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { useHistory } from 'react-router-dom';
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';

const customMarkerIcon = new L.Icon ({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/car-with-sensor/100/Car_Location-512.png',
  iconSize: [100, 100],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


const MarkMapLocation = () => {
  // const [haveUsersLocation, setHaveUsersLocation] = useState(false);
  // const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});
  const [userLocation, setUserLocation] = useState({lat: 40.47470736152738, lng: -80.06415069160637});
  //   const history = useHistory();
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setMarkerPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error in getting location');
        setUserLocation({ lat: 40.4406, lng: -79.9959 }); // city of Pittsburgh
      },
      {enableHighAccuracy: true}
    )
    }, []);
    
    const onMarkerDragEnd = (e) => {
      setTimeout(() => {
        const newCoords = e.target.getLatLng();
        console.log('Marker dragged', newCoords);
      });
    };
    
    const onMarkerClick = (e) => {
      const coords = e.target.getCoordinates();
      console.log(coords);
    };
  
    return (
      <div>
        <div>
      
        <MapContainer className='map-container' center={userLocation} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
              <Marker
              position={markerPosition}
              icon={customMarkerIcon}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
              onClick={onMarkerClick}
              />
        </MapContainer>
        
      </div>
    </div>
  );
}


export default MarkMapLocation;
//     setMarkerCoords({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     });
//     setLocation({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     });
//     setHaveUsersLocation(true);
//   },
//   () => {
//     console.log('Error in getting location');
//     setLocation({ lat: 40.4406, lng: -79.9959 }); // city of Pittsburgh
//   });
// }, [location]);

// const handleMarkerDrag = (e) => {
//   setMarkerCoords({
//     lat: e.latlng.lat,
//     lng: e.latlng.lng
//   });
// }

// const handleLogLocation = async () => {
//   const coordinates = {
//     latitude: markerCoords.lat,
//     longitude: markerCoords.lng,
//   }

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