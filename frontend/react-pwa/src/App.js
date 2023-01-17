import './App.css';

function Header(props) {
  return (
    <header className="Header">
    <button className="App-Name" onclick="location.href='#'" type="button">
        <h1>{props.name}</h1></button>
      <nav className="NavBar">
        <ul className="Menu">
          {props.menu_items.map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
        </nav>
      </header>
  );
}

function Body() {
  return (
  <body></body>
  );
}

/*function Footer(props) {
  return (
    <footer className="Footer">
      <p>&copy; {props.year} {props.team}</p>
    </footer>
  );
} */

const teamMembers = [
  "Joshua Anderson, ",
  "Dennis Bowen, ",
  "Nicholas Hunter, ",
  "Monica Tuttle", // I should try to not hard code this
]

const items = [
  <button className="Menu-Item" onclick="map.html" type="button">Map</button>,
  <button className="Menu-Item" onclick="settings.html" type="button">Settings</button>,
  <button className="Menu-Item" onclick="about.html" type="button">How It Works</button>
];

const menuObjects = items.map(
  (item, i) => ({
    id: i,
    title: item
  })
);

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
/*
function OrButton(props) {
  return (
    <button className="OrButton" type="button">
      <p>{props.text}</p>
    </button>
  )
} */

function App() {
  return (
    <div>
      <Body />
      <Header name="Pothole Patrol" menu_items={menuObjects} />
      <SubmitLocation text="Submit My Location"/>
      
      <LocateOnMap text="Locate on Map"/>
      
    </div>
  );
}

export default App;

/*<Footer
        team={teamMembers}
        year={new Date().getFullYear()}
      /> */

/*<OrButton text="OR" /> */