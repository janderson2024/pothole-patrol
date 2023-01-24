// the whole import section is kinda like the React way of having links instead of <link> html tag
import './styles.css';
import Home from './pages/Home.js';
import Map from './pages/Map.js';
import About from './pages/About.js';
import Navbar from './Navbar.js';
import { Route, Routes} from 'react-router-dom'; // library / API

function App() {  // App is a pretty standard name for the main app used by devs. Below are JSX (they look like html elements, but are not)
  return ( 
    <>
    <Navbar /> 
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </div>
    </>
    )
}

  export default App
