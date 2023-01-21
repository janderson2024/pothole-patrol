import './styles.css';
import Home from './pages/Home.js';
import Map from './pages/Map.js';
import About from './pages/About.js';
import Navbar from './Navbar.js';
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />
    <div className='container'>
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
