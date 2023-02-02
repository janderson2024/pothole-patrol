import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function getLocation(success, error) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
  }
}

async function callRegisterApi(position) {
  const data = {
      "latitude": position.coords.latitude,
      "longitude": position.coords.longitude
  };

  const response = await fetch('./user/register', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
  });

  const text = await response.text();
  console.log(text);
}

export default function Actions(props) {
  useEffect(() => {
    getLocation(callRegisterApi, (error)=>{console.log(error)});
  },[]);
  return (
    <div className="actions-container">
      <SubmitLocation />
      <LocateOnMap text="LOCATE ON MAP" />
    </div>
  );
}

function SubmitLocation() {
  const [status, setStatus] = useState("SUBMIT MY LOCATION");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("UNABLE TO GET LOCATION");
    } else {
      setStatus("LOCATING...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
         const response = await fetch("./api/frontend_test", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(coordinates),
          });
          const text = await response.text();
          console.log(text);
          setStatus("SUBMITTED!");
          console.log(coordinates)
          setTimeout(() => {
            setStatus("SUBMIT MY LOCATION")
          }, 3000);
        },

        () => {
          setStatus("UNABLE TO GET LOCATION");
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
    <Link className="LocateLink" to="/mark_map/">
      <button className="LocateOnMap">
       {props.text}
      </button>
    </Link>
  );
}

//nest in a container with side margins? 