import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo-container">
          <img src={logo} alt="SEEE Club Logo" className="logo-image" />
          <Link to="/" className="logo" onClick={closeMenu}>
            SEEE
          </Link>
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* NAV LINKS */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link to="/events" className="nav-link" onClick={closeMenu}>Events</Link>
          <Link to="/updates" className="nav-link" onClick={closeMenu}>Updates</Link>
          <Link to="/college" className="nav-link" onClick={closeMenu}>College</Link>
          <Link to="/board" className="nav-link" onClick={closeMenu}>Board</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>

          {user && (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="nav-link"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
