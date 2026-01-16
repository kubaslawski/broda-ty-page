import { useState } from 'react';
import './GalleryPage.css';

const galleryItems = [
  {
    id: 1,
    title: 'Classic Fade',
    category: 'włosy',
    barber: 'Kuba',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80'
  },
  {
    id: 2,
    title: 'Gentleman\'s Beard',
    category: 'broda',
    barber: 'Magda',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80'
  },
  {
    id: 3,
    title: 'Modern Pompadour',
    category: 'włosy',
    barber: 'Agata',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80'
  },
  {
    id: 4,
    title: 'Full Transformation',
    category: 'kompleksowe',
    barber: 'Kuba',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80'
  },
  {
    id: 5,
    title: 'Viking Style',
    category: 'broda',
    barber: 'Magda',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&q=80'
  },
  {
    id: 6,
    title: 'Textured Crop',
    category: 'włosy',
    barber: 'Agata',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80'
  },
  {
    id: 7,
    title: 'Sharp Lines',
    category: 'broda',
    barber: 'Kuba',
    image: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=800&q=80'
  },
  {
    id: 8,
    title: 'Executive Cut',
    category: 'włosy',
    barber: 'Agata',
    image: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80'
  },
  {
    id: 9,
    title: 'Hipster Combo',
    category: 'kompleksowe',
    barber: 'Magda',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&q=80'
  },
  {
    id: 10,
    title: 'Skin Fade',
    category: 'włosy',
    barber: 'Kuba',
    image: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=800&q=80'
  },
  {
    id: 11,
    title: 'Natural Beard',
    category: 'broda',
    barber: 'Magda',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
  },
  {
    id: 12,
    title: 'Wedding Ready',
    category: 'kompleksowe',
    barber: 'Agata',
    image: 'https://images.unsplash.com/photo-1612363148951-15f16817648f?w=800&q=80'
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
  const [imageLoaded, setImageLoaded] = useState({});

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

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
                {activeCategory === cat.id && (
                  <span className="gallery-page__filter-count">
                    {cat.id === 'all' ? galleryItems.length : galleryItems.filter(i => i.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="gallery-page__grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item ${imageLoaded[item.id] ? 'loaded' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-item__image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)}
                  />
                  <div className="gallery-item__shimmer"></div>
                </div>
                <div className="gallery-item__overlay">
                  <div className="gallery-item__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
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
            
            <div className="gallery-lightbox__image">
              <img src={selectedItem.image} alt={selectedItem.title} />
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
            
            {/* Navigation */}
            <button 
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
                const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
                setSelectedItem(filteredItems[prevIndex]);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <button 
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
                const nextIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
                setSelectedItem(filteredItems[nextIndex]);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
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
