import { useNavigate } from 'react-router-dom';
import './ExpertsPage.css';

const experts = [
  {
    id: 1,
    name: 'Agata',
    role: 'Senior Barber',
    experience: '6 lat doświadczenia',
    bio: 'Mistrzyni precyzji i detalu. Agata łączy tradycyjne techniki z nowoczesnymi trendami, tworząc unikalne stylizacje dla każdego klienta. Jej pasja do barberstwa zaczęła się od fascynacji sztuką strzyżenia.',
    specializations: ['Strzyżenie klasyczne', 'Koloryzacja', 'Stylizacja ślubna', 'Fade cuts'],
    quote: '"Każde strzyżenie to mała sztuka - trzeba ją tworzyć z pasją."',
    initials: 'A',
    stats: {
      clients: '1200+',
      rating: '4.9',
      years: '6'
    }
  },
  {
    id: 2,
    name: 'Magda',
    role: 'Beard Specialist',
    experience: '4 lata doświadczenia',
    bio: 'Pasjonatka sztuki barberskiej specjalizująca się w pielęgnacji brody. Magda wie, jak wydobyć najlepsze z każdej brody, dopasowując kształt do rysów twarzy i stylu życia klienta.',
    specializations: ['Stylizacja brody', 'Golenie brzytwą', 'Pielęgnacja premium', 'Modelowanie'],
    quote: '"Broda to nie tylko zarost - to wyraz osobowości."',
    initials: 'M',
    stats: {
      clients: '800+',
      rating: '4.8',
      years: '4'
    }
  },
  {
    id: 3,
    name: 'Kuba',
    role: 'Style Expert',
    experience: '5 lat doświadczenia',
    bio: 'Kreatywny artysta z okiem do najnowszych trendów. Kuba tworzy unikalne stylizacje, które wyróżniają się odwagą i precyzją wykonania. Stale śledzi światowe trendy w barberingu.',
    specializations: ['Fade & Taper', 'Nowoczesne cięcia', 'Hair tattoo', 'Trendy stylizacje'],
    quote: '"Styl to sposób na wyrażenie siebie bez słów."',
    initials: 'K',
    stats: {
      clients: '950+',
      rating: '4.9',
      years: '5'
    }
  }
];

const ExpertsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="experts-page">
      <section className="experts-page__hero">
        <div className="container">
          <span className="section-subtitle">Nasz zespół</span>
          <h1 className="experts-page__title">Poznaj Ekspertów</h1>
          <p className="experts-page__intro">
            Za sukcesem Broda Ty stoją ludzie z pasją. Nasz zespół to doświadczeni 
            specjaliści, którzy nieustannie doskonalą swoje umiejętności, aby zapewnić 
            Ci najwyższą jakość usług.
          </p>
        </div>
      </section>

      <section className="experts-page__list section">
        <div className="container">
          {experts.map((expert, index) => (
            <div 
              key={expert.id} 
              className={`expert-card ${index % 2 === 1 ? 'expert-card--reverse' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="expert-card__visual">
                <div className="expert-card__avatar">
                  <span>{expert.initials}</span>
                </div>
                <div className="expert-card__stats">
                  <div className="expert-card__stat">
                    <span className="expert-card__stat-value">{expert.stats.clients}</span>
                    <span className="expert-card__stat-label">Klientów</span>
                  </div>
                  <div className="expert-card__stat">
                    <span className="expert-card__stat-value">{expert.stats.rating}</span>
                    <span className="expert-card__stat-label">Ocena</span>
                  </div>
                  <div className="expert-card__stat">
                    <span className="expert-card__stat-value">{expert.stats.years}</span>
                    <span className="expert-card__stat-label">Lat</span>
                  </div>
                </div>
              </div>
              
              <div className="expert-card__content">
                <div className="expert-card__header">
                  <h2 className="expert-card__name">{expert.name}</h2>
                  <span className="expert-card__role">{expert.role}</span>
                </div>
                
                <p className="expert-card__bio">{expert.bio}</p>
                
                <blockquote className="expert-card__quote">
                  {expert.quote}
                </blockquote>
                
                <div className="expert-card__specializations">
                  <h4>Specjalizacje:</h4>
                  <div className="expert-card__tags">
                    {expert.specializations.map((spec, i) => (
                      <span key={i} className="expert-card__tag">{spec}</span>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary expert-card__btn"
                  onClick={() => navigate('/rezerwacja')}
                >
                  Umów wizytę z {expert.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experts-page__values section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
            Dlaczego my?
          </h2>
          <div className="experts-page__values-grid">
            <div className="value-card">
              <span className="value-card__icon">🎯</span>
              <h3>Precyzja</h3>
              <p>Każdy detal ma znaczenie. Pracujemy z najwyższą starannością.</p>
            </div>
            <div className="value-card">
              <span className="value-card__icon">💡</span>
              <h3>Kreatywność</h3>
              <p>Śledzimy trendy i tworzymy unikalne stylizacje.</p>
            </div>
            <div className="value-card">
              <span className="value-card__icon">🤝</span>
              <h3>Indywidualne podejście</h3>
              <p>Każdy klient jest wyjątkowy i zasługuje na szczególną uwagę.</p>
            </div>
            <div className="value-card">
              <span className="value-card__icon">⭐</span>
              <h3>Jakość</h3>
              <p>Używamy tylko najlepszych produktów i narzędzi.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertsPage;

