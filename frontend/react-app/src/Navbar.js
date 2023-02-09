import React from 'react';
import MenuPopupState from "./PopupMenu";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className='site-title'>
      <Link to="/">Pothole Patrol</Link>
      </h1>
      <MenuPopupState />
    </nav>
  );
}

