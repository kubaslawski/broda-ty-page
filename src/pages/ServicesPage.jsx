import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const services = [
  {
    id: 1,
    name: 'Strzyżenie włosów',
    description: 'Klasyczne lub nowoczesne strzyżenie dopasowane do Twojego stylu. Obejmuje konsultację, mycie, strzyżenie oraz stylizację końcową.',
    price: 60,
    duration: '45 min',
    icon: '✂️',
    details: [
      'Konsultacja ze stylistą',
      'Mycie włosów profesjonalnymi produktami',
      'Precyzyjne strzyżenie',
      'Stylizacja końcowa'
    ]
  },
  {
    id: 2,
    name: 'Strzyżenie brody',
    description: 'Profesjonalne modelowanie i przycinanie brody. Nadamy Twojej brodzie idealny kształt dopasowany do rysów twarzy.',
    price: 40,
    duration: '30 min',
    icon: '🪮',
    details: [
      'Analiza kształtu twarzy',
      'Modelowanie brody',
      'Precyzyjne krawędzie',
      'Olejek pielęgnacyjny'
    ]
  },
  {
    id: 3,
    name: 'Włosy + Broda',
    description: 'Kompleksowa usługa strzyżenia włosów i brody. Idealne połączenie dla pełnej metamorfozy.',
    price: 90,
    duration: '60 min',
    icon: '💈',
    popular: true,
    details: [
      'Pełna konsultacja',
      'Strzyżenie włosów',
      'Modelowanie brody',
      'Stylizacja kompleksowa'
    ]
  },
  {
    id: 4,
    name: 'Golenie brzytwą',
    description: 'Tradycyjne golenie brzytwą z gorącym ręcznikiem. Rytuał pielęgnacyjny rodem z klasycznych barber shopów.',
    price: 50,
    duration: '40 min',
    icon: '🪒',
    details: [
      'Gorący ręcznik',
      'Przygotowanie skóry',
      'Golenie brzytwą',
      'Balsam kojący'
    ]
  },
  {
    id: 5,
    name: 'Koloryzacja brody',
    description: 'Farbowanie brody dla naturalnego lub odważnego efektu. Maskowanie siwizny lub zmiana koloru.',
    price: 35,
    duration: '25 min',
    icon: '🎨',
    details: [
      'Dobór odcienia',
      'Test alergiczny',
      'Aplikacja farby',
      'Pielęgnacja końcowa'
    ]
  },
  {
    id: 6,
    name: 'Pielęgnacja premium',
    description: 'Luksusowy zabieg obejmujący masaż twarzy, maskę, olejowanie brody i profesjonalną stylizację.',
    price: 80,
    duration: '50 min',
    icon: '👑',
    details: [
      'Masaż twarzy',
      'Maska regenerująca',
      'Olejowanie brody',
      'Aromaterapia'
    ]
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="services-page">
      <section className="services-page__hero">
        <div className="container">
          <span className="section-subtitle">Co oferujemy</span>
          <h1 className="services-page__title">Nasze Usługi</h1>
          <p className="services-page__intro">
            Oferujemy pełen zakres profesjonalnych usług barberskich. 
            Od klasycznego strzyżenia po luksusowe zabiegi pielęgnacyjne - 
            znajdziesz u nas wszystko, czego potrzebuje prawdziwy mężczyzna.
          </p>
        </div>
      </section>

      <section className="services-page__list section">
        <div className="container">
          <div className="services-page__grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`service-detail-card ${service.popular ? 'service-detail-card--popular' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.popular && (
                  <span className="service-detail-card__badge">Najpopularniejsze</span>
                )}
                
                <div className="service-detail-card__header">
                  <span className="service-detail-card__icon">{service.icon}</span>
                  <div className="service-detail-card__price-tag">
                    <span className="service-detail-card__price">{service.price} zł</span>
                    <span className="service-detail-card__duration">{service.duration}</span>
                  </div>
                </div>
                
                <h2 className="service-detail-card__title">{service.name}</h2>
                <p className="service-detail-card__description">{service.description}</p>
                
                <ul className="service-detail-card__features">
                  {service.details.map((detail, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="btn btn-primary service-detail-card__btn"
                  onClick={() => navigate('/rezerwacja')}
                >
                  Zarezerwuj
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-page__cta section">
        <div className="container">
          <div className="services-page__cta-box">
            <h2>Nie wiesz, którą usługę wybrać?</h2>
            <p>Nasi eksperci pomogą dobrać idealny zabieg podczas bezpłatnej konsultacji.</p>
            <button className="btn btn-primary" onClick={() => navigate('/rezerwacja')}>
              Umów konsultację
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

