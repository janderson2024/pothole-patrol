import Actions from "../Actions.js";

export default function Home() {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-summary">
        <ul className="how-it-works-list">
          <h3 className="how-it-works-title">HOW IT WORKS</h3>
          <li className="instructions-item">
            <div className="permissions-title">ALLOW LOCATION PERMISSIONS</div>
            in the browser for this app to work
          </li>
          <li className="instructions-item">
            <div className="submit-location-title">CLICK 'SUBMIT MY LOCATION'</div> to
            quickly report a pothole at your current location
          </li>
          <li className="instructions-item">
            <div className="locate-on-map-title">CLICK 'LOCATE ON MAP'</div> Click on a location where there's a pothole. 
            Then click on the marker to submit.
          </li>
          <li className="instructions-item">
            <div className="view-map-title">VIEW MAP (UNDER 'MENU')</div>
            to see a map of all reports near you and to report potholes as fixed
          </li>
        </ul>
        <hr></hr>
        <Actions className="button-container" />
      </div>
    </div>
  );
}

