import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import '../node_modules/leaflet/dist/leaflet.css';
import '../src/styles.css';
import L from 'leaflet';

async function callRegisterApi(position) {
  console.log(position.lat)
  const data = {
      "latitude": position.lat,
      "longitude": position.lng
  }
  console.log(data);

  const response = await fetch('./api/frontend_test', {
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
  const [status, setStatus] = useState("SUBMIT");
  const submitData = async() => {
    console.log("submit data: " + markerPos());
    callRegisterApi(markerPos());
    setStatus("SUBMITTED!")
    setTimeout(() => {
      setStatus("SUBMIT")
    }, 3000);
  }
  return (
      <Popup minWidth={90}>
        <button onClick={submitData}>{status}</button>
      </Popup>
  )
}

const customMarkerIcon = new L.Icon ({
  iconUrl: './pin.png',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [1, -34],
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


const MarkMapLocation = () => {

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
      <CustomMarker/>
    </MapContainer>
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