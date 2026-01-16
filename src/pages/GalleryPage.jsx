import { useState } from 'react';
import './GalleryPage.css';

const galleryItems = [
  {
    id: 1,
    title: 'Classic Fade',
    category: 'włosy',
    barber: 'Kuba',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
  },
  {
    id: 2,
    title: 'Gentleman\'s Beard',
    category: 'broda',
    barber: 'Magda',
    gradient: 'linear-gradient(135deg, #2d132c 0%, #801336 50%, #c72c41 100%)'
  },
  {
    id: 3,
    title: 'Modern Pompadour',
    category: 'włosy',
    barber: 'Agata',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #2c5282 100%)'
  },
  {
    id: 4,
    title: 'Full Transformation',
    category: 'kompleksowe',
    barber: 'Kuba',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #4a4a4a 100%)'
  },
  {
    id: 5,
    title: 'Viking Style',
    category: 'broda',
    barber: 'Magda',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #5c3d2e 50%, #8b6914 100%)'
  },
  {
    id: 6,
    title: 'Textured Crop',
    category: 'włosy',
    barber: 'Agata',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2e5a8f 50%, #3e7abf 100%)'
  },
  {
    id: 7,
    title: 'Sharp Lines',
    category: 'broda',
    barber: 'Kuba',
    gradient: 'linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 50%, #5a5a5a 100%)'
  },
  {
    id: 8,
    title: 'Executive Cut',
    category: 'włosy',
    barber: 'Agata',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)'
  },
  {
    id: 9,
    title: 'Hipster Combo',
    category: 'kompleksowe',
    barber: 'Magda',
    gradient: 'linear-gradient(135deg, #2b1a0e 0%, #5a3d2b 50%, #8b5a2b 100%)'
  },
  {
    id: 10,
    title: 'Skin Fade',
    category: 'włosy',
    barber: 'Kuba',
    gradient: 'linear-gradient(135deg, #141414 0%, #2a2a2a 50%, #3f3f3f 100%)'
  },
  {
    id: 11,
    title: 'Natural Beard',
    category: 'broda',
    barber: 'Magda',
    gradient: 'linear-gradient(135deg, #3d2914 0%, #6b4423 50%, #9a6b35 100%)'
  },
  {
    id: 12,
    title: 'Wedding Ready',
    category: 'kompleksowe',
    barber: 'Agata',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 50%, #4a4a6a 100%)'
  }
];

const categories = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'włosy', label: 'Włosy' },
  { id: 'broda', label: 'Broda' },
  { id: 'kompleksowe', label: 'Kompleksowe' }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-page">
      <section className="gallery-page__hero">
        <div className="container">
          <span className="section-subtitle">Nasze realizacje</span>
          <h1 className="gallery-page__title">Galeria</h1>
          <p className="gallery-page__intro">
            Zobacz efekty naszej pracy. Każda stylizacja to unikalne dzieło 
            stworzone z pasją i precyzją przez naszych ekspertów.
          </p>
        </div>
      </section>

      <section className="gallery-page__content section">
        <div className="container">
          <div className="gallery-page__filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`gallery-page__filter ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gallery-page__grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item"
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  background: item.gradient
                }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-item__overlay">
                  <div className="gallery-item__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
                      <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                    </svg>
                  </div>
                  <h3 className="gallery-item__title">{item.title}</h3>
                  <div className="gallery-item__meta">
                    <span className="gallery-item__category">{item.category}</span>
                    <span className="gallery-item__barber">by {item.barber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="gallery-lightbox" onClick={() => setSelectedItem(null)}>
          <div className="gallery-lightbox__content" onClick={e => e.stopPropagation()}>
            <button 
              className="gallery-lightbox__close"
              onClick={() => setSelectedItem(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div 
              className="gallery-lightbox__image"
              style={{ background: selectedItem.gradient }}
            >
              <div className="gallery-lightbox__placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <span>Stylizacja: {selectedItem.title}</span>
              </div>
            </div>
            
            <div className="gallery-lightbox__info">
              <h2>{selectedItem.title}</h2>
              <div className="gallery-lightbox__details">
                <span className="gallery-lightbox__tag">{selectedItem.category}</span>
                <span className="gallery-lightbox__barber">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {selectedItem.barber}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="gallery-page__cta section">
        <div className="container">
          <div className="gallery-page__cta-box">
            <h2>Chcesz podobną stylizację?</h2>
            <p>Umów się na wizytę i stwórz swój własny niepowtarzalny look.</p>
            <a href="/rezerwacja" className="btn btn-primary">
              Zarezerwuj wizytę
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

