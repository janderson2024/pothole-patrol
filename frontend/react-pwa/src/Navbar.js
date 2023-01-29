import { Link, useMatch, useResolvedPath } from "react-router-dom";


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="site-title">
        <a href="/pothole-patrol/">Pothole Patrol</a>
      </h1>
      <ul>
        <CustomLink to="/view_map">Map</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
      <button className="hamburger"></button>
    </nav>
  );
}
