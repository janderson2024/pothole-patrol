import MenuPopupState from "./PopupMenu";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="site-title">
        <a href="/pothole-patrol/">Pothole Patrol</a>
      </h1>
      <MenuPopupState />
    </nav>
  );
}

