import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Actions(props) {
  return (
    <div>
      <SubmitLocation text="Submit My Location" />
      <LocateOnMap text="Locate on Map" />
    </div>
  );
}

//var array = [];

function SubmitLocation(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);


  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };


  return (
    <div className="coordinates">
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      <button className="SubmitLocation" onClick={getLocation} type="button">
        <p>{props.text}</p>
      </button>
    </div>
  );
}

// need to change where the button links to - it will be a whole different map page just for the user's view without other pins/markers
function LocateOnMap(props) {
  return (
    <button className="LocateOnMap" type="button">
         <Link to="/mark_map">
            <p>{props.text}</p>
            </Link>
    </button>
  );
}

/*
function LocationCode() {
  alert(array); // temporary placeholder until we store the array somewhere for the backend to process
}
var array = []; // temporary global variable, not ideal
array.push(position.coords.latitude, position.coords.longitude);

*/
