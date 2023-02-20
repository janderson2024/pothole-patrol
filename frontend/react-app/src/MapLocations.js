import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import "../node_modules/leaflet/dist/leaflet.css";
import "../src/styles.css";
import Button from "@mui/material/Button";
import L from "leaflet";

const getIcon = (reportCount) => {
  const TEST_PIN = "./pin.png";
  const RED_ICON = "./red_pin.png";
  const YELLOW_ICON = "./yellow_pin.png";
  const GREEN_ICON = "./green_pin.png";

  var pin = TEST_PIN;

  if (reportCount > 2) {
    pin = RED_ICON;
  } else if (reportCount > 1) {
    pin = YELLOW_ICON;
  } else {
    pin = GREEN_ICON;
  }

  return new L.Icon({
    iconUrl: pin,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [2, -30],
  });
};

async function getPotholesTest() {
  const url = "./api/potholes";

  const response = await fetch(url, {
    method: "GET",
  });
  return await response.json();
}
async function callCompletionStatusApi(id) {
  console.log(id);
  const data = {
    potholeId: id,
  };
  const response = await fetch("./api/potholes/repair", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const text = await response.text();
  console.log(text);
}

function CustomPopup({ pothole }) {
  const [status, setStatus] = useState("MARK FIXED");

  const updatePotholeStatus = async () => {
    console.log("submit data: " + pothole);
    callCompletionStatusApi(pothole.potholeID);
    setStatus("SUBMITTED!");
    setTimeout(() => {
      setStatus("MARK FIXED");
      window.location.reload();
    }, 2000);
  };
  return (
    <Popup className="marker-popup" maxWidth={130}>
      Pothole here! It has {pothole.reportCount} report{"(s)"}!
      <Button
        className="fixed-button"
        variant="contained"
        onClick={updatePotholeStatus}
      >
        {status}
      </Button>
    </Popup>
  );
}

function CenterMapComp() {
  const map = useMap();
  useEffect(() => {
    map.on("locationfound", async function (e) {
      map.setView(e.latlng, map.getZoom());
    });
    map.locate();
  }, [map]);

  return null;
}

const MapLocations = () => {
  const [markers, setMarkers] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [filterType, setFilterType] = useState("no-filter");

  useEffect(() => {
    async function getPotholeList() {
      const potholes = await getPotholesTest();
      setMarkers(potholes.potholes);
    }
    getPotholeList();
  }, []);

  let filteredMarkers = markers;

  if (filterType === "city") {
    filteredMarkers = markers.filter((marker) =>
      marker.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  } else if (filterType === "zip") {
    filteredMarkers = markers.filter((marker) =>
      marker.zip.toLowerCase().includes(zipFilter.toLowerCase())
    );
  }

  return (
    <div>
      <div className="container-for-filter">
        <div className="select-container">
          <select
            className="select-filter"
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="no-filter">NO FILTER</option>
            <option value="city">FILTER BY CITY</option>
            <option value="zip">FILTER BY ZIP</option>
          </select>
        </div>
        <div className="filter-container">
          {filterType === "city" && (
            <input
              className="filter-input"
              type="text"
              placeholder="Enter city"
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
            />
          )}
          {filterType === "zip" && (
            <input
              className="filter-input"
              type="text"
              placeholder="Enter zip"
              value={zipFilter}
              onChange={(event) => setZipFilter(event.target.value)}
            />
          )}
        </div>
      </div>
      <MapContainer
        className="map-locations"
        center={[0, 0]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <img className="map-key" src="./map-key.png" alt="Color Key" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CenterMapComp />
        {filteredMarkers.map((pothole, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={[pothole.latitude, pothole.longitude]}
            icon={getIcon(pothole.reportCount)}
          >
            <CustomPopup pothole={pothole} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default MapLocations;
