import React, { useEffect } from "react";
import ReportOnMap from "./ReportOnMap";
import SubmitLocation from "./SubmitMyLocation";

function getLocation(success, error) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

async function callRegisterApi(position) {
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  const response = await fetch("./user/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  console.log(text);
}

export default function Actions(props) {
  useEffect(() => {
    getLocation(callRegisterApi, (error) => {
      console.log(error);
    });
  }, []);
  return (
    <div className="actions-container">
      <SubmitLocation />
      <pre>OR</pre>
      <ReportOnMap text="REPORT ON MAP" />
    </div>
  );
}

