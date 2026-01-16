import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        {/* Video background */}
        <video 
          className="hero__video"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80"
        >
          <source 
            src="https://videos.pexels.com/video-files/7697116/7697116-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="hero__video-overlay"></div>
        <div className="hero__pattern"></div>
        <div className="hero__gradient"></div>
      </div>
      
      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-icon">✦</span>
          <span>Premium Barber Shop</span>
        </div>
        
        <h1 className="hero__title">
          <span className="hero__title-line">Broda</span>
          <span className="hero__title-line hero__title-accent">Ty</span>
        </h1>
        
        <p className="hero__subtitle">
          Gdzie tradycja spotyka się z nowoczesnością. 
          Profesjonalna pielęgnacja brody i włosów w sercu miasta.
        </p>
        
        <div className="hero__cta">
          <Link to="/rezerwacja" className="btn btn-primary">
            Zarezerwuj wizytę
          </Link>
          <Link to="/uslugi" className="btn btn-outline">
            Poznaj ofertę
          </Link>
        </div>
        
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">5+</span>
            <span className="hero__stat-label">Lat doświadczenia</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">3000+</span>
            <span className="hero__stat-label">Zadowolonych klientów</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">3</span>
            <span className="hero__stat-label">Ekspertów</span>
          </div>
        </div>
      </div>
      
      <div className="hero__scroll">
        <span>Przewiń w dół</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
