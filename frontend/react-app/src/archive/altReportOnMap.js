import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";

export default function ReportOnMap(props) {
    const [redirectTo, setRedirectTo] = useState(false); // your state value to manipulate

    const getPermissions = () => {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setRedirectTo(true);
          console.log("Hey, map page!");
        } else {
          setRedirectTo(false);
          console.log("Hey, home page!");
          alert("Please allow location permissions in your browser's settings. Then refresh or close/reopen the browser to use this app.")
        }
      });
    };
    // return to another component make these statements below returning components
    if (redirectTo) {
      return (
        <div className="locate-on-map-container">
          <Link to="/mark_map" >
          <button className="ReportOnMap" onClick={getPermissions} type="button">
            {props.text}
            <PinDropIcon className="PinDropIcon" />
          </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="locate-on-map-container">
          <Link to="/" >
          <button className="ReportOnMap" onClick={getPermissions} type="button">
            {props.text}
            <PinDropIcon className="PinDropIcon" />
          </button>
          </Link>
        </div>
      );
    }
  }
  