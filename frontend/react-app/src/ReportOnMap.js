import React, { useState } from "react";
import { Link } from "react-router-dom";
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function ReportOnMap(props) {

    const getPermissions = () => {
      if (!navigator.geolocation) {
        alert("Please allow location permissions in your browser's settings. Then refresh or close/reopen the browser to use this app.")
      } else {
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
          }
        );
      }
    };
    return (
      <div className="locate-on-map-container">
      <Link className="LocateLink" to="/mark_map">
        <button className="ReportOnMap" onClick={getPermissions} type="button">
         {props.text}
         <PinDropIcon className="PinDropIcon" />
        </button>
      </Link>
      </div>
    );
  }
  