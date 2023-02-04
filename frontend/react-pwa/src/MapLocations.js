import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';

// may not need this for now, maybe useful for testing
function CustomPopup({markerPos}) {
  const submitData = async() => {
    console.log("submit data: " + markerPos()); // can pass in the position/lat/lng here instead, so popup can display that
  }
  return (
      <Popup minWidth={90}>
        {/* display location of pothole in the popup */}
      </Popup>
  )
}

// custom component as child of map

const customMarkerIcon = new L.Icon ({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_01-512.png',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [1, -34],
}); 

// need a component that would call this, then make a new marker on lat/long
/*async function getPotholesTest(position) {
  const data = {
      lat: testLatitude || position.coords.latitude,
      lng: testLongitude || position.coords.longitude,
      filter: "city" || "zip"
  };
  const url = './api/potholes' + "?latitude=" + data.lat + "&longitude=" + data.lng + "&filter=" + data.filter;

  response = await fetch(url, {
      method: "GET"
  });
  text = await response.json();
  console.log(text);
}
*/

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

  const getMarkerPos = () => {
    return markerPosition;
  };

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

  const onMarkerDragEnd = (e) =>{
    console.log(e);
  }

  return (
  <Marker
    position={markerPosition}
    icon={customMarkerIcon}
    draggable={true}
    eventHandlers={eventHandlers}
    ref={markerRef}
  >
    <CustomPopup markerPos={getMarkerPos}/>
  </Marker>
  );
}


const MapLocations = () => {

  return (
    <MapContainer 
      className='map-container' 
      center={[0, 0]} 
      zoom={15} 
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <CustomMarker/> need component that will have code that fetches points*/}
    </MapContainer>
  );
}


export default MapLocations;