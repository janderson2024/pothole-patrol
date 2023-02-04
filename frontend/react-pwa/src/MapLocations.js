import React, {useEffect} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';

const customMarkerIcon = new L.Icon ({
  iconUrl: './pin.png',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [1, -34],
}); 

// need a component that would call this, then make a new marker on lat/long
async function getPotholesTest(position) {
  const data = {
      lat: position.lat,
      lng: position.lng,
      filter: "city" || "zip"
  };
  const url = './api/potholes?latitude=' + data.lat + "&longitude=" + data.lng + "&filter=" + data.filter;

  const response = await fetch(url, {
      method: "GET"
  });
  return await response.json();
}


function CustomComp() {
  const map = useMap();

  useEffect(() => {
    map.on("locationfound", async function (e) {
      //console.log("here");
      map.setView(e.latlng, map.getZoom());

      //get potholes here from serve
      const potholes = await getPotholesTest(e.latlng);
      
      for(const pothole of potholes.potholes){
        const marker = new L.marker([pothole.latitude, pothole.longitude],{icon:customMarkerIcon});
        marker.addTo(map).bindPopup("Pothole location: " + pothole.latitude + ", " + pothole.longitude);
        //console.log(pothole);
      }
    });
    map.locate();
  },[map]);


  return null;
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
      <CustomComp/>
    </MapContainer>
  );
}


export default MapLocations;