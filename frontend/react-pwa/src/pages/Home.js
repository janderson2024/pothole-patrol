import Actions from "../Actions.js";

export default function Home() {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-summary">
        <ul>
          <h3 className="how-it-works-title">HOW IT WORKS</h3>
          <li>
            <div className="submit-location-title">SUBMIT MY LOCATION</div> to
            quickly report a pothole at your current location
          </li>
          <br></br>
          <li>
            <div className="locate-on-map-title">LOCATE ON MAP</div> to drag and
            drop a marker where there's a pothole
          </li>
        </ul>
        <br></br>
        <hr></hr>
        <Actions className="button-container" />
      </div>
    </div>
  );
}
