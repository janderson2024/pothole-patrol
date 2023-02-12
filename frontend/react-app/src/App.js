import Home from './pages/Home.js';
import ViewMap from './pages/ViewMap.js';
import MarkMap from './pages/MarkMap.js';
import About from './pages/About.js';
import Navbar from './Navbar.js';
import Permissions from './Permissions.js';
import { Route, Routes} from 'react-router-dom';

function App() {  
  return ( 
    <>
    <Navbar /> 
    <div>
        <Routes>
            {/* <Route path="/permissions" element={<Permissions />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/view_map" element={<ViewMap />} />
            <Route path="/about" element={<About />} />
            <Route path="/mark_map" element={<MarkMap />} />
        </Routes>
    </div>
    </>
    )
}

  export default App
