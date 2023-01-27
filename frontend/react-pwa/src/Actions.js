import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Actions(props) {
  return (
    <div>
      <SubmitLocation />
      <LocateOnMap text="Locate on Map" />
    </div>
  );
}

function SubmitLocation() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState("Submit My Location");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          const coordinates = {
            latitude: lat,
            longitude: lng, 
          };

          setStatus("Submitted!");
          console.log(coordinates);
          // I need a timer here and to reset the button to "Submit My Location" after a certain amount of time
        },

        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="coordinates">
      <button className="SubmitLocation" onClick={getLocation} type="button">
        <p>{status}</p> {/*how to use useState() for the button change?*/}
      </button>
    </div>
  );
}

function LocateOnMap(props) {
  return (
    <Link className="LocateLink" to="/mark_map">
      <button className="LocateOnMap">
        <p>{props.text}</p>
      </button>
    </Link>
  );
}

