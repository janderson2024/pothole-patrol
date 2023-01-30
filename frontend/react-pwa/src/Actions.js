import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Actions(props) {
  return (
    <div>
      <SubmitLocation />
      <LocateOnMap text="LOCATE ON MAP" />
    </div>
  );
}

function SubmitLocation() {
  const [status, setStatus] = useState("SUBMIT MY LOCATION");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("LOCATING...");
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
          // https://stackoverflow.com/questions/63820933/how-to-disable-a-button-using-react-usestate-hook-inside-event-handler
          setStatus("SUBMITTED!");
          console.log(coordinates)
          setTimeout(() => {
            setStatus("SUBMIT MY LOCATION")
          }, 3000);
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
       {props.text}
      </button>
    </Link>
  );
}
