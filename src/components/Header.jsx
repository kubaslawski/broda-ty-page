import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Broda</span>
          <span className="header__logo-accent">Ty</span>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li>
              <Link to="/uslugi" className={isActive('/uslugi') ? 'active' : ''}>
                Usługi
              </Link>
            </li>
            <li>
              <Link to="/eksperci" className={isActive('/eksperci') ? 'active' : ''}>
                Eksperci
              </Link>
            </li>
            <li>
              <Link to="/galeria" className={isActive('/galeria') ? 'active' : ''}>
                Galeria
              </Link>
            </li>
            <li>
              <Link to="/rezerwacja" className={isActive('/rezerwacja') ? 'active' : ''}>
                Rezerwacja
              </Link>
            </li>
          </ul>
        </nav>

        <Link to="/rezerwacja" className="btn btn-primary header__cta">
          Umów wizytę
        </Link>

        <button 
          className={`header__burger ${isMobileMenuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
