import Actions from "../Actions.js";
import Navbar from "../Navbar.js";
import AltNavbar from "../AltNavbar.js";
import Instructions from "./PermissionsInstructions.js";
import React, { useState } from "react";

export default function Home() {
  const [redirectTo, setRedirectTo] = useState(true);
  if (!navigator.geolocation) {
  } else {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setRedirectTo(true);
        console.log(coordinates);
        console.log("Hey, you gained access to the app!");
      },

      () => {
        setRedirectTo(false);
        console.log("Hey, you're on the permissions page.");
      }
    );
  }
  if (redirectTo) {
    return <DefaultHome />;
  } else {
    return (
      <div>
        <AltNavbar />
        <Instructions />
      </div>
    );
  }
}

function DefaultHome() {
  return (
    <div>
      <Navbar />
      <div className="how-it-works-container">
        <div className="how-it-works-summary">
          <ul className="how-it-works-list">
            <h3 className="how-it-works-title">HOW IT WORKS</h3>
            <li className="instructions-item">
              <div className="permissions-title">
                ALLOW LOCATION PERMISSIONS
              </div>
              for this site in the browser
            </li>
            <li className="instructions-item">
              <div className="submit-location-title">
                CLICK 'SUBMIT MY LOCATION'
              </div>{" "}
              to instantly report a pothole at your current location
            </li>
            <li className="instructions-item">
              <div className="locate-on-map-title">CLICK 'REPORT ON MAP'</div>{" "}
              to move the marker to a place where there's a pothole. Click on
              the marker to submit a report
            </li>
            <li className="instructions-item">
              <div className="view-map-title">VIEW MAP (UNDER 'MENU')</div>
              to see a map of all reports near you and to report potholes as
              fixed
            </li>
          </ul>
          <hr></hr>
          <Actions className="button-container" />
        </div>
      </div>
    </div>
  );
}
