import React, { useState } from "react";

export default function Actions(props) {
  return (
    <div>
      <SubmitLocation text="Submit My Location" />
      <LocateOnMap text="Locate on Map" />
    </div>
  );
}

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
          setLng(position.coords.longitude);
        },
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

function LocateOnMap(props) {
  return (
    <button className="LocateOnMap" onClick="map.html" type="button">
      <p>{props.text}</p>
    </button>
  );
}
