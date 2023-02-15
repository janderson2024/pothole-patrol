import { Button } from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import L from 'leaflet';

const routeStyle = {
    color: "#0f4c91",
    weight: 5
  };

const waypointMarker = new L.Icon ({
    iconUrl: './pin.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [2, -30],
  });

const potholeMarker = new L.Icon ({
    iconUrl: './red_pin.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [2, -30],
  });


function DestMarker({setUser, setDest, generateRoute}) {
    const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});
  
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            //console.log("dragged");
            setMarkerPosition(marker.getLatLng());
            setDest(marker.getLatLng());
          }
        },
      }),
      [setDest]
    );
    const map = useMap();
  
    useEffect(() => {
      map.on("click", function (e){
        //console.log("click");
        setMarkerPosition(e.latlng);
        setDest(e.latlng);
      });
      map.on("locationfound", function (e) {
        //console.log("here");
        map.setView(e.latlng, map.getZoom(), {animate:true});
        setUser(e.latlng);
      });
      map.locate();
    },[map, setDest, setUser]);
  
    return (
        <Marker
            position={markerPosition}
            icon={waypointMarker}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
        >
            <Popup>
                <Button 
                    className="fixed-button" 
                    variant="contained" 
                    onClick={generateRoute}
                >
                    Generate a pothole-free route
                </Button>
            </Popup>
        </Marker>
    );
}


function Map() {
    const [userPosition, setUserPosition] = useState(null);
    const [destPosition, setDestPosition] = useState(null);
    const [routingData, setRoutingData] = useState(null);
    const [gotData, setGotData] = useState(false);
    const [potholes, setPotholes] = useState(null);
    const [waypoints, setWayPoints] = useState(null);

    async function generateRoute(){
        const data = {
            source : {lat: userPosition.lat, lng: userPosition.lng},
            dest : {lat: destPosition.lat, lng: destPosition.lng}
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
    
        const response = await fetch('./api/routing/generate', requestOptions);
        if(!response.ok){
            alert("Hmm We ran into an error. This may happen if a pothole is on the starting/ending spot");
            return;
        }
        const geoData = await response.json();
        setGotData(true);
        setPotholes(geoData.properties.avoid[0].values);
        setWayPoints([geoData.properties.waypoints[0].location, geoData.properties.waypoints[1].location])
        setRoutingData(geoData);
    }


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

        {routingData && (
        <GeoJSON
            style={routeStyle}
            key="my-geoJson"
            data={routingData} />
        )}

        {potholes && potholes.map((pothole, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={[pothole.lat, pothole.lon]}
            icon={potholeMarker}
          >
            <Popup>
                Avoided this pothole!
            </Popup>
          </Marker>
        ))}
        {waypoints && waypoints.map((waypoint, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={[waypoint[1], waypoint[0]]}
            icon={waypointMarker}
          />
        ))}

        {!gotData && (
            <DestMarker 
            generateRoute={generateRoute}
            setUser={setUserPosition}
            setDest={setDestPosition}
        />)}
        {userPosition && !gotData && (
        <Marker position={userPosition} icon={waypointMarker}>
          <Popup>Your location!</Popup>
        </Marker>
        )}
    </MapContainer>
  );
}

export default Map;
