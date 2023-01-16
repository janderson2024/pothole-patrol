import './App.css';


function Head(props) {
  return (
    <head className="Head">
      <title>{props.title}</title>
    </head>
  )

}
function Header(props) {
  return (
    <header className="Header">
      <h1>{props.name}</h1>
    </header>
  );
}

function Main(props) {
  return (
    <nav className="NavBar">
      <ul>
        {props.menu_items.map((item) => (
          <li key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer(props) {
  return (
    <footer>
      <p>&copy; {props.year} {props.team}</p>
    </footer>
  );
}

const teamMembers = [
  "Joshua Anderson, ",
  "Dennis Bowen, ",
  "Nicholas Hunter, ",
  "Monica Tuttle",
]

const items = [
  <a href="map.html">Map</a>,
  <a href="settings.html">Settings</a>,
  <a href="about.html">How It Works</a>
];

const menuObjects = items.map(
  (item, i) => ({
    id: i,
    title: item
  })
);

function SubmitLocation(props) {
  return (
    <button>
      <p>{props.text}</p>
    </button>
  )
  }

function LocateOnMap(props) {
  return (
    <button>
      <p>{props.text}</p>
    </button>
  )
}

function App() {
  return (
    <div>
      <Head title="Pothole Patrol"/>
      <Header name="Pothole Patrol" />
      <Main
        menu_items={menuObjects}
      />
      <SubmitLocation text="Submit My Location"/>
      <LocateOnMap text="Locate on Map"/>
      <Footer
        team={teamMembers}
        year={new Date().getFullYear()}
      />
    </div>
  );
}

export default App;
