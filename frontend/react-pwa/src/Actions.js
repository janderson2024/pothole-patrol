
export default function Actions(props) {
    return (
        <div>
        <SubmitLocation text="Submit My Location"/>
        <LocateOnMap text="Locate on Map"/>
        </div>
    )
}

function SubmitLocation(props) {
    return (
      <button className="SubmitLocation" onclick="#" type="button">
        <p>{props.text}</p>
      </button>
    )
    }
  
  function LocateOnMap(props) {
    return (
      <button className="LocateOnMap" onclick="map.html" type="button">
        <p>{props.text}</p>
      </button>
    )
  }