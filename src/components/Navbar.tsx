import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        [HOME]
      </Link>
      <Link
        to="/about"
        className={location.pathname === '/about' ? 'active' : ''}
      >
        [ABOUT]
      </Link>
      <Link
        to="/experiences"
        className={location.pathname === '/experiences' ? 'active' : ''}
      >
        [EXPERIENCES]
      </Link>
      <Link
        to="/projects"
        className={location.pathname === '/projects' ? 'active' : ''}
      >
        [PROJECTS]
      </Link>
    </nav>
  );
};

export default Navbar;
