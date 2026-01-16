import { Link } from 'react-router-dom';
import './Team.css';

const teamMembers = [
  {
    id: 1,
    name: 'Agata',
    role: 'Senior Barber',
    experience: '6 lat doświadczenia',
    specialization: 'Specjalizacja: strzyżenie klasyczne, koloryzacja',
    bio: 'Mistrzyni precyzji i detalu. Agata łączy tradycyjne techniki z nowoczesnymi trendami.',
    initials: 'A'
  },
  {
    id: 2,
    name: 'Magda',
    role: 'Beard Specialist',
    experience: '4 lata doświadczenia',
    specialization: 'Specjalizacja: stylizacja brody, golenie brzytwą',
    bio: 'Pasjonatka sztuki barberskiej. Magda wie, jak wydobyć najlepsze z każdej brody.',
    initials: 'M'
  },
  {
    id: 3,
    name: 'Kuba',
    role: 'Style Expert',
    experience: '5 lat doświadczenia',
    specialization: 'Specjalizacja: fade, nowoczesne cięcia',
    bio: 'Kreatywny artysta z okiem do najnowszych trendów. Kuba tworzy unikalne stylizacje.',
    initials: 'K'
  }
];

const Team = () => {
  return (
    <section id="team" className="team section">
      <div className="container">
        <div className="team__header">
          <span className="section-subtitle">Nasz Zespół</span>
          <h2 className="section-title">Poznaj Ekspertów</h2>
          <p className="team__description">
            Nasz zespół to doświadczeni specjaliści z pasją do barberstwa. 
            Każdy z nich wnosi unikalne umiejętności i styl.
          </p>
        </div>
        
        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="team-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="team-card__image">
                <div className="team-card__avatar">
                  <span>{member.initials}</span>
                </div>
                <div className="team-card__overlay">
                  <Link 
                    to="/rezerwacja"
                    className="team-card__book-btn"
                  >
                    Umów wizytę
                  </Link>
                </div>
              </div>
              
              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p className="team-card__bio">{member.bio}</p>
                
                <div className="team-card__details">
                  <span className="team-card__experience">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    {member.experience}
                  </span>
                  <span className="team-card__specialization">
                    {member.specialization}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="team__more">
          <Link to="/eksperci" className="btn btn-outline">
            Poznaj nas bliżej
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
