import Actions from "../Actions.js";

export default function Home() {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-summary">
        <ul className="how-it-works-list">
          <h3 className="how-it-works-title">HOW IT WORKS</h3>
          <li>
            <div className="permissions-title">ALLOW LOCATION PERMISSIONS</div>
            in the browser for this app to work
          </li>
          <li>
            <div className="submit-location-title">CLICK 'SUBMIT MY LOCATION'</div> to
            quickly report a pothole at your current location
          </li>
          <li>
            <div className="locate-on-map-title">CLICK 'LOCATE ON MAP'</div> to drag, click  
            and submit a marker where there's a pothole on the map
          </li>
          <li>
            <div className="view-map-title">VIEW MAP (UNDER 'MENU')</div>
            to see a map of all reports near you
          </li>
        </ul>
        <hr></hr>
        <Actions className="button-container" />
      </div>
    </div>
  );
}

