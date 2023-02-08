import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
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
async function getPotholesTest() {
  const url = './api/potholes';

  const response = await fetch(url, {
      method: "GET"
  });
  return await response.json();
}


function CenterMapComp() {
  const map = useMap();
  useEffect(() => {
    map.on("locationfound", async function (e) {
      map.setView(e.latlng, map.getZoom());
    });
    map.locate();
  },[map]);

  return null;
}



const MapLocations = () => {
  const [markers, setMarkers] = useState([]);

  const [cityFilter, setCityFilter] = useState('');
  const [zipFilter, setZipFilter] = useState('');
  const [filterType, setFilterType] = useState('no-filter');

  useEffect( () => {
    async function getPotholeList(){
      //get potholes here from server
      const potholes = await getPotholesTest();
      setMarkers(potholes.potholes);
    }
    getPotholeList();
    },[]);

  let filteredMarkers = markers;

  if (filterType === 'city') {
    filteredMarkers = markers.filter(
      (marker) => marker.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  } else if (filterType === 'zip') {
    filteredMarkers = markers.filter(
      (marker) => marker.zip.toLowerCase().includes(zipFilter.toLowerCase())
    );
  }

  return (
    <>
    <select
        value={filterType}
        onChange={(event) => setFilterType(event.target.value)}
      >
        <option value="no-filter">No filter</option>
        <option value="city">Filter by city</option>
        <option value="zip">Filter by zip</option>
      </select>
      {filterType === 'city' && (
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(event) => setCityFilter(event.target.value)}
        />
      )}
      {filterType === 'zip' && (
        <input
          type="text"
          placeholder="Filter by zip"
          value={zipFilter}
          onChange={(event) => setZipFilter(event.target.value)}
        />
      )}
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
      <CenterMapComp/>
      {filteredMarkers.map((pothole, idx) => (
        <Marker key={`marker-${idx}`} position={[pothole.latitude, pothole.longitude]} icon={customMarkerIcon}>
          <Popup>
            TODO: add button to mark as completed
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );

};


export default MapLocations;