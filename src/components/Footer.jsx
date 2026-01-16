import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">Broda</span>
              <span className="footer__logo-accent">Ty</span>
            </Link>
            <p className="footer__tagline">
              Gdzie tradycja spotyka się z nowoczesnością.<br />
              Twój styl, nasza pasja.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__info">
            <div className="footer__section">
              <h4>Godziny otwarcia</h4>
              <ul>
                <li>
                  <span>Poniedziałek - Piątek</span>
                  <span>9:00 - 20:00</span>
                </li>
                <li>
                  <span>Sobota</span>
                  <span>10:00 - 18:00</span>
                </li>
                <li>
                  <span>Niedziela</span>
                  <span>Zamknięte</span>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Kontakt</h4>
              <ul className="footer__contact">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>ul. Barberska 42<br />00-001 Warszawa</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+48 123 456 789</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>kontakt@brodaty.pl</span>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Szybkie linki</h4>
              <ul className="footer__links">
                <li><Link to="/uslugi">Usługi</Link></li>
                <li><Link to="/eksperci">Eksperci</Link></li>
                <li><Link to="/galeria">Galeria</Link></li>
                <li><Link to="/rezerwacja">Rezerwacja</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Broda Ty. Wszystkie prawa zastrzeżone.</p>
          <p className="footer__credit">Crafted with passion for beards</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
