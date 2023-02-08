import React from 'react';
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

