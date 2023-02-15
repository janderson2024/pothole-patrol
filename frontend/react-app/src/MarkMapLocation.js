import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';

async function callSubmitPotholeApi(position) {
  const data = {
      "latitude": position.lat,
      "longitude": position.lng
  }

  const response = await fetch('./api/submitpothole', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
  });

  const text = await response.text();
  console.log(text);
}

function CustomPopup({markerPos}) {
  let navigate = useNavigate();
  const [status, setStatus] = useState("SUBMIT");
  
  const submitData = async() => {
    console.log("submit data: " + markerPos);
    callSubmitPotholeApi(markerPos);
    setStatus("SUBMITTED!")
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  return (
      <Popup minWidth={90}>
        <Button variant="contained"onClick={submitData}>{status}</Button>
      </Popup>
  )
}

const customMarkerIcon = new L.Icon ({
  iconUrl: './pin.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [2, -30],
});


function CustomMarker() {
  const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          //console.log("dragged");
          setMarkerPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const map = useMap();

  useEffect(() => {
    map.on("click", function (e){
      //console.log("click");
      setMarkerPosition(e.latlng);
    });
    map.on("locationfound", function (e) {
      //console.log("here");
      map.setView(e.latlng, map.getZoom(), {animate:true});
      setMarkerPosition(e.latlng);
    });
    map.locate();
  },[map]);

  return (
  <Marker
    position={markerPosition}
    icon={customMarkerIcon}
    draggable={true}
    eventHandlers={eventHandlers}
    ref={markerRef}
  >
    <CustomPopup markerPos={markerPosition}/>
  </Marker>
  );
}


const MarkMapLocation = () => {

  return (
    <MapContainer 
      className='map' 
      center={[0, 0]} 
      zoom={15} 
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <CustomMarker/>
    </MapContainer>
  );
}


export default MarkMapLocation;