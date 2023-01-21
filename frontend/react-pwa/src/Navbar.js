import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Navbar() {
    return (
      <nav className='nav'>
        <h1 className='site-title'>
            <Link to="/">
              Pothole Patrol
            </Link>
        </h1>
        <ul>
          <CustomLink to="/map">Map</CustomLink>
          <CustomLink to="/about">About</CustomLink>
        </ul>
      </nav>
    )
    }
    function CustomLink({ to, children, ...props }) {
      const resolvedPath = useResolvedPath(to)
      const isActive = useMatch({ path: resolvedPath.pathname, end: true })
      
      return (
        <li className={isActive ? "active" : ""}>
          <Link to={to} {...props}>
          {children}
          </Link>
        </li>
      )
  }
