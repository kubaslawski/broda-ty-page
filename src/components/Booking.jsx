import { useState, useMemo } from 'react';
import './Booking.css';
import BarberMiniSchedule, { getAppointmentsForBarber } from './BarberMiniSchedule';

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

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
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

  // Get busy slots for selected barber and date
  const getBusySlots = useMemo(() => {
    if (!booking.barber || !booking.date) return new Set();
    
    const appointments = getAppointmentsForBarber(booking.barber.name);
    const selectedDate = new Date(booking.date);
    const dayOfWeek = selectedDate.getDay();
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Monday = 0
    
    const busySlots = new Set();
    
    appointments
      .filter(apt => apt.day === dayIndex + 1)
      .forEach(apt => {
        const aptStartMinutes = apt.startHour * 60 + apt.startMinute;
        const aptEndMinutes = aptStartMinutes + apt.duration;
        
        // Mark all 15-minute slots that overlap with this appointment as busy
        for (let mins = aptStartMinutes; mins < aptEndMinutes; mins += 15) {
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          busySlots.add(`${h}:${m.toString().padStart(2, '0')}`);
        }
      });
    
    return busySlots;
  }, [booking.barber, booking.date]);

  // Check if a time slot is available for the selected service duration
  const isSlotAvailable = (hour, minute) => {
    if (!booking.service || !booking.barber || !booking.date) return true;
    
    const serviceDuration = booking.service.duration;
    const slotStartMinutes = hour * 60 + parseInt(minute);
    const slotEndMinutes = slotStartMinutes + serviceDuration;
    
    // Check if the service would go past closing time (19:00)
    if (slotEndMinutes > 19 * 60) return false;
    
    // Check if any 15-minute slot within the service duration is busy
    for (let mins = slotStartMinutes; mins < slotEndMinutes; mins += 15) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      if (getBusySlots.has(`${h}:${m.toString().padStart(2, '0')}`)) {
        return false;
      }
    }
    
    return true;
  };

  // Get appointment info for a busy slot
  const getAppointmentForSlot = (hour, minute) => {
    if (!booking.barber || !booking.date) return null;
    
    const appointments = getAppointmentsForBarber(booking.barber.name);
    const selectedDate = new Date(booking.date);
    const dayOfWeek = selectedDate.getDay();
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const slotMinutes = hour * 60 + parseInt(minute);
    
    return appointments.find(apt => {
      if (apt.day !== dayIndex + 1) return false;
      const aptStartMinutes = apt.startHour * 60 + apt.startMinute;
      const aptEndMinutes = aptStartMinutes + apt.duration;
      return slotMinutes >= aptStartMinutes && slotMinutes < aptEndMinutes;
    });
  };

  const handleServiceSelect = (service) => {
    setBooking({ ...booking, service, hour: '', minute: '' });
  };

  const handleBarberSelect = (barber) => {
    setBooking({ ...booking, barber, hour: '', minute: '' });
    setShowSchedulePreview(false);
  };

  const handleDateChange = (e) => {
    setBooking({ ...booking, date: e.target.value, hour: '', minute: '' });
  };

  const handleHourSelect = (hour) => {
    setBooking({ ...booking, hour: hour.toString(), minute: '' });
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

  const getEndTime = () => {
    if (booking.hour && booking.minute && booking.service) {
      const startMinutes = parseInt(booking.hour) * 60 + parseInt(booking.minute);
      const endMinutes = startMinutes + booking.service.duration;
      const endHour = Math.floor(endMinutes / 60);
      const endMin = endMinutes % 60;
      return `${endHour}:${endMin.toString().padStart(2, '0')}`;
    }
    return '';
  };

  // Check if any minute slot is available for selected hour
  const hasAvailableMinuteSlots = (hour) => {
    return minutes.some(minute => isSlotAvailable(hour, minute));
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
                          <span className="booking__service-duration">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            {service.duration} min
                          </span>
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
                  
                  {/* Info about service duration */}
                  {booking.service && (
                    <div className="booking__service-info-banner">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                      </svg>
                      Usługa <strong>{booking.service.name}</strong> trwa <strong>{booking.service.duration} min</strong>. 
                      Niedostępne terminy są oznaczone jako zajęte.
                    </div>
                  )}
                  
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
                          <label>Godzina rozpoczęcia</label>
                          <div className="booking__hour-grid">
                            {hours.map((hour) => {
                              const hasAvailable = hasAvailableMinuteSlots(hour);
                              return (
                                <button
                                  key={hour}
                                  type="button"
                                  className={`booking__time-btn ${booking.hour === hour.toString() ? 'selected' : ''} ${!hasAvailable ? 'fully-booked' : ''}`}
                                  onClick={() => hasAvailable && handleHourSelect(hour)}
                                  disabled={!hasAvailable}
                                >
                                  {hour}:00
                                  {!hasAvailable && <span className="booking__time-btn-badge">Zajęte</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                        {booking.hour && (
                          <div className="booking__time-group">
                            <label>Minuty</label>
                            <div className="booking__minute-grid">
                              {minutes.map((minute) => {
                                const available = isSlotAvailable(parseInt(booking.hour), minute);
                                const apt = !available ? getAppointmentForSlot(parseInt(booking.hour), minute) : null;
                                
                                return (
                                  <button
                                    key={minute}
                                    type="button"
                                    className={`booking__time-btn booking__time-btn--minute ${booking.minute === minute ? 'selected' : ''} ${!available ? 'unavailable' : ''}`}
                                    onClick={() => available && handleMinuteSelect(minute)}
                                    disabled={!available}
                                    title={apt ? `Zajęte: ${apt.service} (${apt.client})` : ''}
                                  >
                                    {booking.hour}:{minute}
                                    {!available && (
                                      <span className="booking__time-btn-status">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <circle cx="12" cy="12" r="10"/>
                                          <line x1="15" y1="9" x2="9" y2="15"/>
                                          <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                        Zajęte
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {booking.hour && booking.minute && (
                          <div className="booking__selected-time">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>
                              Wizyta: <strong>{getFormattedTime()}</strong> - <strong>{getEndTime()}</strong>
                              <span className="booking__selected-time-duration">({booking.service?.duration} min)</span>
                            </span>
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
                      <span>{getFormattedTime()} - {getEndTime()}</span>
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
            <p className="booking__confirmation-details">
              Usługa: {booking.service?.name} ({booking.service?.duration} min)<br />
              Specjalista: {booking.barber?.name}
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
