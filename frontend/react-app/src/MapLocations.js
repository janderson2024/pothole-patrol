import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';


const getIcon = (reportCount) => {
  const TEST_PIN = "./pin.png";
  const RED_ICON = "./red_pin.png";
  const YELLOW_ICON = "./yellow_pin.png";
  const GREEN_ICON = "./green_pin.png";

  var pin = TEST_PIN;

  if(reportCount > 2) {
    pin = RED_ICON;
  } else if(reportCount > 1) {
    pin = YELLOW_ICON;
  } else {
    pin = GREEN_ICON;
  }

  return new L.Icon ({
    iconUrl: pin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [2, -30],
  })
}

// need a component that would call this, then make a new marker on lat/long
async function getPotholesTest() {
  const url = './api/potholes';

  const response = await fetch(url, {
      method: "GET"
  });
  return await response.json();
  //return {"potholes":[{"potholeID":1,"city":"Port Saint Lucie","zip":"34953","reportCount":5,"status":"Not completed","latitude":27.2621,"longitude":-80.3835},{"potholeID":2,"city":"Port Saint Lucie","zip":"34953","reportCount":1,"status":"Not completed","latitude":27.263043318823183,"longitude":-80.37253646240883},{"potholeID":3,"city":"Port Saint Lucie","zip":"34953","reportCount":2,"status":"Not completed","latitude":27.25341053100089,"longitude":-80.37676543868598},{"potholeID":4,"city":"Port Saint Lucie","zip":"34987","reportCount":1,"status":"Not completed","latitude":27.27294407274045,"longitude":-80.42533667052845},{"potholeID":5,"city":"Port Saint Lucie","zip":"34952","reportCount":1,"status":"Not completed","latitude":27.29903549441731,"longitude":-80.30472710467508},{"potholeID":6,"city":"Pittsburgh","zip":"15210","reportCount":1,"status":"Not completed","latitude":40.41254846437486,"longitude":-80.0052923478928},{"potholeID":7,"city":"Port Saint Lucie","zip":"34953","reportCount":1,"status":"Not completed","latitude":27.262640975882256,"longitude":-80.38001272951445},{"potholeID":8,"city":"Port Saint Lucie","zip":"34953","reportCount":1,"status":"Not completed","latitude":27.259512784361693,"longitude":-80.38837610672822},{"potholeID":9,"city":"Port Saint Lucie","zip":"34953","reportCount":1,"status":"Not completed","latitude":27.2637651482132,"longitude":-80.37830579633257}]};
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
        <Marker key={`marker-${idx}`} position={[pothole.latitude, pothole.longitude]} icon={getIcon(pothole.reportCount)}>
          <Popup>
            TODO: add button to mark as completed for Pothole Id : {pothole.potholeID}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );

};


export default MapLocations;