import React from "react";
import { Link } from "react-router-dom";

export default function AltNavbar() {
  return (
    <nav className="nav">
      <h1 className="site-title">
        <Link to="/">Pothole Patrol</Link>
      </h1>
    </nav>
  );
}
