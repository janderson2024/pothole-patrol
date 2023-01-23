import './App.css';
import React, { useState} from 'react';
import './pages/Map.js';
import './pages/About.js';


function Button({href}) {
  return <button className="Menu-Item" onclick={`${href}.html`} type="button">{href}</button>
}

function Header(props) {
  const [buttons, setButtons] = useState(["Map", "Settings", "How It Works"]);
  return (
    <header className="Header">
    <button className="App-Name" onclick="location.href='#'" type="button">
        <h1>{props.name}</h1></button>
      <nav className="NavBar">
        <ul className="Menu">
          {buttons.map((item) => (
            <Button href={item}/>
          ))}
        </ul>
        </nav>
      </header>
  );
}

// this could be reduced to one function with useState()
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


function App() {
  return (
    <div>
      <Header name="Pothole Patrol" />
      <SubmitLocation text="Submit My Location"/>
      <LocateOnMap text="Locate on Map"/>
    </div>
  );
  }

  export default App
