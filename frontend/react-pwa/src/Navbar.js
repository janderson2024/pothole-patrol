import React from 'react';
import { useLocation } from "react-router-dom";
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
        <a href="/pothole-patrol/">Pothole Patrol</a>
      </h1>
      <MenuPopupState />
    </nav>
  );
}

