import React, { useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function SubmitLocation() {
    const statuses = {
      submitMyLocation: "SUBMIT MY LOCATION",
      locating: "LOCATING",
      submitted: "SUBMITTED",
      unableToGetLocation: "SUBMISSION FAILED",
    };
  
    const [status, setStatus] = useState(statuses.submitMyLocation);
    const [disabled, setDisabled] = useState(false);
  
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus(statuses.unableToGetLocation);
        alert(
          "Please allow location permissions in your browser's site settings and then refresh the browser to use this app."
        );
      } else {
        setStatus(statuses.locating);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            const response = await fetch("./api/submitpothole", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(coordinates),
            });
            const text = await response.text();
            console.log(text);
            setStatus(statuses.submitted);
            setDisabled(true);
            console.log(coordinates);
            setTimeout(() => {
              setStatus(statuses.submitMyLocation);
              setDisabled(false);
            }, 10000);
          },
  
          () => {
            setStatus(statuses.unableToGetLocation);
            alert(
              "Please allow location permissions in your browser's site settings and then refresh the browser to use this app."
            );
          }
        );
      }
    };
  
    return (
      <div className="coordinates">
        <button
          disabled={disabled}
          className="SubmitLocation"
          onClick={getLocation}
          type="button"
        >
          <p>{status}</p>
          <MyLocationIcon className="LocationIcon" />
        </button>
      </div>
    );
  }