import { useState } from 'react';
import './Booking.css';
import BarberMiniSchedule from './BarberMiniSchedule';

const services = [
  { id: 1, name: 'Strzyżenie włosów', price: 60, duration: 45 },
  { id: 2, name: 'Strzyżenie brody', price: 40, duration: 30 },
  { id: 3, name: 'Włosy + Broda', price: 90, duration: 60 },
  { id: 4, name: 'Golenie brzytwą', price: 50, duration: 40 },
  { id: 5, name: 'Koloryzacja brody', price: 35, duration: 25 },
  { id: 6, name: 'Pielęgnacja premium', price: 80, duration: 50 }
];

const barbers = [
  { id: 1, name: 'Agata', specialty: 'Senior Barber', color: '#e74c3c' },
  { id: 2, name: 'Magda', specialty: 'Beard Specialist', color: '#9b59b6' },
  { id: 3, name: 'Kuba', specialty: 'Style Expert', color: '#3498db' }
];

const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
const minutes = ['00', '15', '30', '45'];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    service: null,
    barber: null,
    date: '',
    hour: '',
    minute: '',
    name: '',
    phone: '',
    email: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSchedulePreview, setShowSchedulePreview] = useState(false);

  const handleServiceSelect = (service) => {
    setBooking({ ...booking, service });
  };

  const handleBarberSelect = (barber) => {
    setBooking({ ...booking, barber });
    setShowSchedulePreview(false);
  };

  const handleDateChange = (e) => {
    setBooking({ ...booking, date: e.target.value });
  };

  const handleHourSelect = (hour) => {
    setBooking({ ...booking, hour });
  };

  const handleMinuteSelect = (minute) => {
    setBooking({ ...booking, minute });
  };

  const handleInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const resetBooking = () => {
    setBooking({
      service: null,
      barber: null,
      date: '',
      hour: '',
      minute: '',
      name: '',
      phone: '',
      email: ''
    });
    setStep(1);
    setShowConfirmation(false);
    setShowSchedulePreview(false);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return booking.service !== null;
      case 2: return booking.barber !== null;
      case 3: return booking.date !== '' && booking.hour !== '' && booking.minute !== '';
      case 4: return booking.name !== '' && booking.phone !== '';
      default: return false;
    }
  };

  const getFormattedTime = () => {
    if (booking.hour && booking.minute) {
      return `${booking.hour}:${booking.minute}`;
    }
    return '';
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="booking section">
      <div className="container">
        <div className="booking__header">
          <span className="section-subtitle">Rezerwacja</span>
          <h2 className="section-title">Umów Wizytę</h2>
          <p className="booking__description">
            Zarezerwuj wizytę w kilku prostych krokach. 
            Wybierz usługę, specjalistę i dogodny termin.
          </p>
        </div>

        {!showConfirmation ? (
          <div className="booking__content">
            <div className="booking__progress">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`booking__progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
                  <span className="booking__progress-number">{s}</span>
                  <span className="booking__progress-label">
                    {s === 1 && 'Usługa'}
                    {s === 2 && 'Specjalista'}
                    {s === 3 && 'Termin'}
                    {s === 4 && 'Dane'}
                  </span>
                </div>
              ))}
              <div className="booking__progress-line">
                <div className="booking__progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
              </div>
            </div>

            <form className="booking__form" onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="booking__step">
                  <h3 className="booking__step-title">Wybierz usługę</h3>
                  <div className="booking__services">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        className={`booking__service-card ${booking.service?.id === service.id ? 'selected' : ''}`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <div className="booking__service-info">
                          <span className="booking__service-name">{service.name}</span>
                          <span className="booking__service-duration">{service.duration} min</span>
                        </div>
                        <span className="booking__service-price">{service.price} zł</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Barber Selection */}
              {step === 2 && (
                <div className="booking__step">
                  <h3 className="booking__step-title">Wybierz specjalistę</h3>
                  <div className="booking__barbers">
                    {barbers.map((barber) => (
                      <div key={barber.id} className="booking__barber-wrapper">
                        <button
                          type="button"
                          className={`booking__barber-card ${booking.barber?.id === barber.id ? 'selected' : ''}`}
                          onClick={() => handleBarberSelect(barber)}
                          style={{ '--barber-color': barber.color }}
                        >
                          <div className="booking__barber-avatar" style={{ background: barber.color }}>
                            {barber.name.charAt(0)}
                          </div>
                          <div className="booking__barber-info">
                            <span className="booking__barber-name">{barber.name}</span>
                            <span className="booking__barber-specialty">{barber.specialty}</span>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="booking__barber-schedule-btn"
                          onClick={() => {
                            handleBarberSelect(barber);
                            setShowSchedulePreview(true);
                          }}
                          style={{ color: barber.color }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          Zobacz grafik
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {showSchedulePreview && booking.barber && (
                    <div className="booking__schedule-preview">
                      <BarberMiniSchedule 
                        barber={booking.barber} 
                        onClose={() => setShowSchedulePreview(false)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Date & Time Selection */}
              {step === 3 && (
                <div className="booking__step">
                  <h3 className="booking__step-title">Wybierz termin</h3>
                  
                  {/* Show mini schedule for selected barber */}
                  {booking.barber && (
                    <div className="booking__step-schedule">
                      <BarberMiniSchedule 
                        barber={booking.barber} 
                        compact={true}
                        selectedDate={booking.date}
                      />
                    </div>
                  )}
                  
                  <div className="booking__datetime">
                    <div className="booking__date-picker">
                      <label>Data</label>
                      <input
                        type="date"
                        value={booking.date}
                        onChange={handleDateChange}
                        min={today}
                      />
                    </div>
                    
                    {booking.date && (
                      <div className="booking__time-selection">
                        <div className="booking__time-group">
                          <label>Godzina</label>
                          <div className="booking__hour-grid">
                            {hours.map((hour) => (
                              <button
                                key={hour}
                                type="button"
                                className={`booking__time-btn ${booking.hour === hour ? 'selected' : ''}`}
                                onClick={() => handleHourSelect(hour)}
                              >
                                {hour}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {booking.hour && (
                          <div className="booking__time-group">
                            <label>Minuty</label>
                            <div className="booking__minute-grid">
                              {minutes.map((minute) => (
                                <button
                                  key={minute}
                                  type="button"
                                  className={`booking__time-btn booking__time-btn--minute ${booking.minute === minute ? 'selected' : ''}`}
                                  onClick={() => handleMinuteSelect(minute)}
                                >
                                  :{minute}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {booking.hour && booking.minute && (
                          <div className="booking__selected-time">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            Wybrana godzina: <strong>{getFormattedTime()}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Contact Details */}
              {step === 4 && (
                <div className="booking__step">
                  <h3 className="booking__step-title">Twoje dane</h3>
                  <div className="booking__contact">
                    <div className="booking__input-group">
                      <label>Imię i nazwisko *</label>
                      <input
                        type="text"
                        name="name"
                        value={booking.name}
                        onChange={handleInputChange}
                        placeholder="Jan Kowalski"
                        required
                      />
                    </div>
                    <div className="booking__input-group">
                      <label>Numer telefonu *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={booking.phone}
                        onChange={handleInputChange}
                        placeholder="123 456 789"
                        required
                      />
                    </div>
                    <div className="booking__input-group">
                      <label>Email (opcjonalnie)</label>
                      <input
                        type="email"
                        name="email"
                        value={booking.email}
                        onChange={handleInputChange}
                        placeholder="jan@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="booking__summary">
                    <h4>Podsumowanie</h4>
                    <div className="booking__summary-row">
                      <span>Usługa:</span>
                      <span>{booking.service?.name}</span>
                    </div>
                    <div className="booking__summary-row">
                      <span>Specjalista:</span>
                      <span>{booking.barber?.name}</span>
                    </div>
                    <div className="booking__summary-row">
                      <span>Data:</span>
                      <span>{new Date(booking.date).toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="booking__summary-row">
                      <span>Godzina:</span>
                      <span>{getFormattedTime()}</span>
                    </div>
                    <div className="booking__summary-row">
                      <span>Czas trwania:</span>
                      <span>{booking.service?.duration} min</span>
                    </div>
                    <div className="booking__summary-row booking__summary-total">
                      <span>Do zapłaty:</span>
                      <span>{booking.service?.price} zł</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="booking__actions">
                {step > 1 && (
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    Wstecz
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextStep}
                    disabled={!canProceed()}
                  >
                    Dalej
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!canProceed()}
                  >
                    Potwierdź rezerwację
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="booking__confirmation">
            <div className="booking__confirmation-icon">✓</div>
            <h3>Rezerwacja potwierdzona!</h3>
            <p>
              Dziękujemy za rezerwację, <strong>{booking.name}</strong>!<br />
              Czekamy na Ciebie <strong>{new Date(booking.date).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</strong> o godzinie <strong>{getFormattedTime()}</strong>.
            </p>
            <p className="booking__confirmation-note">
              Potwierdzenie zostanie wysłane SMS-em na numer {booking.phone}.
            </p>
            <button className="btn btn-primary" onClick={resetBooking}>
              Nowa rezerwacja
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
