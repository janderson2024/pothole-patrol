import Home from "./pages/Home.js";
import ViewMap from "./pages/ViewMap.js";
import MarkMap from "./pages/MarkMap.js";
import RouteMap from "./pages/RouteMap";
import About from "./pages/About.js";
import Instructions from "./pages/PermissionsInstructions.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/permissions_instructions" element={<Instructions />} />
          <Route path="/" element={<Home />} />
          <Route path="/view_map" element={<ViewMap />} />
          <Route path="/about" element={<About />} />
          <Route path="/mark_map" element={<MarkMap />} />
          <Route path="/route_map" element={<RouteMap />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
