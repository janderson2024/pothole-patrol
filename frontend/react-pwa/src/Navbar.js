import React from 'react';
import { Link } from "react-router-dom";
import MenuPopupState from "./PopupMenu";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className='site-title'>
        Pothole Patrol
      </h1>
      <MenuPopupState />
    </nav>
  );
}

