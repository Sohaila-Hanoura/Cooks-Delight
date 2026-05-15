import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube, FaSearch } from "react-icons/fa";
import "./Navbar.css";
import logo from './Logo.svg';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem('userToken');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const firstName = userData ? userData.firstName : "";

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setUserDropdownOpen(false);
    if (userDropdownOpen) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [userDropdownOpen]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    navigate(val ? `/search?q=${encodeURIComponent(val)}` : `/search`, { replace: true });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUserDropdownOpen(false);
    setMenuOpen(false);
    navigate('/login'); 
  };

  return (
    <nav className={`navbar ${menuOpen ? "navbar-expanded" : ""} ${isAuthPage ? "auth-navbar" : ""} ${isScrolled ? "scrolled" : ""}`}>
      
      <div className="nav-top-row">
        {!menuOpen && (
          <Link to="/" className="banner__brand">
            <div className="banner__logo-icon">
              <img src={logo} alt="Logo" />
            </div>
            <div className="banner__brand-text">
              <span className="banner__brand-name">Cooks</span>
              <span className="banner__brand-sub">Delight</span>
            </div>
          </Link>
        )}

        {!isAuthPage && !menuOpen && (
          <ul className="nav-links">
            <li><NavLink to="/" end>HOME</NavLink></li>
            <li><NavLink to="/recipes">RECIPES</NavLink></li>
            <li><NavLink to="/tips">COOKING TIPS</NavLink></li>
            <li><NavLink to="/about">ABOUT US</NavLink></li>
          </ul>
        )}

        {!isAuthPage && !menuOpen && (
          <div className="nav-actions">
            <div className={`search-container ${desktopSearchOpen ? "active" : ""}`}>
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearchChange}
                className="search-input"
              />
              <div className="search-icon-wrapper" onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}>
                <FaSearch />
              </div>
            </div>

            {isAuthenticated && (
              <div className="user-profile-wrapper" onClick={(e) => { e.stopPropagation(); setUserDropdownOpen(!userDropdownOpen); }}>
                <div className={`user-icon-circle ${userDropdownOpen ? "active-icon" : ""}`}>
                  <FiUser />
                </div>
                
                {userDropdownOpen && (
                  <div className="user-dropdown-card">
                    <div className="user-card-header">
                      <span className="welcome-text">Welcome back,</span>
                      <span className="display-name">{firstName}</span>
                    </div>
                    <div className="divider-line"></div>
                    <button className="logout-btn-styled" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}

            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              <FiMenu />
            </button>
          </div>
        )}
      </div>

      {!isAuthPage && menuOpen && (
        <div className="dropdown-container">
          <div className="menu-header-row">
            <Link to="/" className="banner__brand" onClick={closeMenu}>
              <div className="banner__logo-icon">
                <img src={logo} alt="Logo" />
              </div>
              <div className="banner__brand-text">
                <span className="banner__brand-name dropdown-text-white">Cooks</span>
                <span className="banner__brand-sub dropdown-text-white">Delight</span>
              </div>
            </Link>
            <button className="close-btn-styled" onClick={closeMenu}><FiX /></button>
          </div>

          <ul className="mobile-links">
            <li><NavLink to="/" onClick={closeMenu}>HOME</NavLink></li>
            <li><NavLink to="/recipes" onClick={closeMenu}>RECIPES</NavLink></li>
            <li><NavLink to="/tips" onClick={closeMenu}>COOKING TIPS</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>ABOUT US</NavLink></li>
          </ul>

          <div className="mobile-interaction-area">
            <div className="mobile-search-row">
              <button 
                className={`mobile-search-toggle ${mobileSearchOpen ? "active" : ""}`}
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                <FaSearch />
              </button>
            </div>

            {mobileSearchOpen && (
              <div className="mobile-search-field-wrapper">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={query}
                  onChange={handleSearchChange}
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="socials-wrapper">
             <a href="#" className="social-icon-btn"><FaFacebookF /></a>
             <a href="#" className="social-icon-btn"><FaInstagram /></a>
             <a href="#" className="social-icon-btn"><FaYoutube /></a>
          </div>
        </div>
      )}
    </nav>
  );
}