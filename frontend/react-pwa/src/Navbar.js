import React from 'react';
import { Link, useLocation } from "react-router-dom";
import MenuPopupState from "./PopupMenu";


export default function Navbar() {
  const location = useLocation();

  let className = 'nav';
  if (location.pathname === '/mark_map/' || location.pathname === '/view_map/' || location.pathname === '/about/') {
    className +=' no-bottom-margin';
    
  }

  return (
    <nav className={className}>
      <h1 className='site-title'>
        <Link to="/">Pothole Patrol</Link>
      </h1>
      <MenuPopupState />
    </nav>
  );
}

// note: make a catch-all route, but also - the a href link above might be ejecting us from the react app

