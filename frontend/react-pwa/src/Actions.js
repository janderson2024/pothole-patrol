import React, { useState } from "react";
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
  const [status, setStatus] = useState("Submit My Location");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
         /* const response = await fetch("./api/mid_test", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(coordinates),
          });

          const text = await response.text();
          console.log(text); */

          setStatus("Submitted!");
          console.log(coordinates)
          setTimeout(() => {
            setStatus("Submit My Location")
          }, 5000);
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
        <p>{status}</p>
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
