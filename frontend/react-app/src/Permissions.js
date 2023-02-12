import React, { useState, useEffect } from "react";

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

export default function Permissions() {
  <div>Hey, what's up?</div>
} 