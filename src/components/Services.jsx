import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 1,
    name: 'Strzyżenie włosów',
    description: 'Klasyczne lub nowoczesne strzyżenie dopasowane do Twojego stylu',
    price: 60,
    duration: '45 min',
    icon: '✂️'
  },
  {
    id: 2,
    name: 'Strzyżenie brody',
    description: 'Profesjonalne modelowanie i przycinanie brody',
    price: 40,
    duration: '30 min',
    icon: '🪮'
  },
  {
    id: 3,
    name: 'Włosy + Broda',
    description: 'Kompleksowa usługa strzyżenia włosów i brody',
    price: 90,
    duration: '60 min',
    icon: '💈',
    popular: true
  },
  {
    id: 4,
    name: 'Golenie brzytwą',
    description: 'Tradycyjne golenie brzytwą z gorącym ręcznikiem',
    price: 50,
    duration: '40 min',
    icon: '🪒'
  },
  {
    id: 5,
    name: 'Koloryzacja brody',
    description: 'Farbowanie brody dla naturalnego lub odważnego efektu',
    price: 35,
    duration: '25 min',
    icon: '🎨'
  },
  {
    id: 6,
    name: 'Pielęgnacja premium',
    description: 'Masaż twarzy, maska, olejowanie brody i stylizacja',
    price: 80,
    duration: '50 min',
    icon: '👑'
  }
];

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="services__header">
          <span className="section-subtitle">Nasza Oferta</span>
          <h2 className="section-title">Usługi</h2>
          <p className="services__description">
            Oferujemy pełen zakres usług barberskich, od klasycznego strzyżenia 
            po luksusowe zabiegi pielęgnacyjne.
          </p>
        </div>
        
        <div className="services__grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card ${service.popular ? 'service-card--popular' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <span className="service-card__badge">Najpopularniejsze</span>
              )}
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.name}</h3>
              <p className="service-card__description">{service.description}</p>
              <div className="service-card__meta">
                <span className="service-card__duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {service.duration}
                </span>
                <span className="service-card__price">{service.price} zł</span>
              </div>
              <Link to="/rezerwacja" className="service-card__btn">
                Zarezerwuj
              </Link>
            </div>
          ))}
        </div>
        
        <div className="services__more">
          <Link to="/uslugi" className="btn btn-outline">
            Zobacz wszystkie usługi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
