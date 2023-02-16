import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PinDropIcon from '@mui/icons-material/PinDrop';

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
      <pre>OR</pre>
      <ReportOnMap text="REPORT ON MAP" />
    </div>
  );
}

function SubmitLocation() {
  const statuses= {
    submitMyLocation: "SUBMIT MY LOCATION",
    locating: "LOCATING",
    submitted: "SUBMITTED",
    unableToGetLocation: "SUBMISSION FAILED"
  }

  const [status, setStatus] = useState(statuses.submitMyLocation);
  const [disabled, setDisabled] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus(statuses.unableToGetLocation);
      alert("Please allow location permissions in your browser's site settings and then refresh the browser to use this app.")
    } else {
      setStatus(statuses.locating);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
         const response = await fetch("./api/pothole/report", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(coordinates),
          });
          const text = await response.text();
          console.log(text);
          setStatus(statuses.submitted);
          setDisabled(true)
          console.log(coordinates)
          setTimeout(() => {
            setStatus(statuses.submitMyLocation)
            setDisabled(false)
          }, 10000);
        },

        () => {
          setStatus(statuses.unableToGetLocation);
          alert("Please allow location permissions in your browser's site settings and then refresh the browser to use this app.")
        }
      );
    }
  };

  return (
    <div className="coordinates">
      <button disabled={disabled} className="SubmitLocation" onClick={getLocation} type="button">
        <p>{status}</p>
        <MyLocationIcon className="LocationIcon"/>
      </button>
    </div>
  );
}

function ReportOnMap(props) {
  const [link, setLink] = useState("/")

  const getPermissions = () => {
    if (!navigator.geolocation) {
      alert("Please allow location permissions in your browser's settings. Then refresh or close/reopen the browser to use this app.")
    } else {
      setLink("/mark_map")
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log(coordinates)
        },
        () => {
          alert("Please allow location permissions in your browser's settings. Then refresh or close/reopen the browser to use this app.")
          setLink("/")
        }
      );
    }
  };
  return (
    <div className="locate-on-map-container">
    <Link className="LocateLink" to={link}>
      <button className="ReportOnMap" onClick={getPermissions} type="button">
       {props.text}
       <PinDropIcon className="PinDropIcon" />
      </button>
    </Link>
    </div>
  );
}
