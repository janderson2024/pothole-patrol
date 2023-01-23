import React, { useState } from "react";

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

  var array = [] // temporary global variable, not ideal

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          array.push(position.coords.latitude, position.coords.longitude); 
          locationCode()  
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  
  function locationCode() {
    alert(array);   // temporary placeholder until we store the array for backend to use
 }

  return (
    <div className="coordinates">
      <button className="SubmitLocation" onClick={getLocation} type="button">
        <p>{props.text}</p>
      </button>
    </div>
  );
}
// need to change where the button links to - it will be a whole different map page just for the user's view without other pins/markers
function LocateOnMap(props) {
  return (
    <button className="LocateOnMap" onClick="map.html" type="button">  
      <p>{props.text}</p>
    </button>
  );
}

/* <p>{status}</p>
{lat && <p>Latitude: {lat}</p>}
{lng && <p>Longitude: {lng}</p>} */
