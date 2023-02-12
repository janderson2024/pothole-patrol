import React, { useState, useEffect } from "react";

function getLocation(success, error) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
  }
}
  

export default function Permissions() {
  <div>Hey, what's up?</div>

} 
