import { useState } from 'react';
import './BarberMiniSchedule.css';

// Sample appointments data with precise times
const sampleAppointments = {
  'Agata': [
    { id: 1, day: 1, startHour: 9, startMinute: 0, duration: 45, client: 'Marek K.', service: 'Strzyżenie włosów' },
    { id: 2, day: 1, startHour: 10, startMinute: 30, duration: 60, client: 'Piotr W.', service: 'Włosy + Broda' },
    { id: 3, day: 1, startHour: 14, startMinute: 0, duration: 45, client: 'Adam S.', service: 'Strzyżenie włosów' },
    { id: 4, day: 2, startHour: 9, startMinute: 30, duration: 60, client: 'Tomasz B.', service: 'Włosy + Broda' },
    { id: 5, day: 2, startHour: 12, startMinute: 0, duration: 45, client: 'Michał Z.', service: 'Strzyżenie włosów' },
    { id: 6, day: 2, startHour: 15, startMinute: 30, duration: 50, client: 'Krzysztof P.', service: 'Pielęgnacja premium' },
    { id: 7, day: 3, startHour: 10, startMinute: 0, duration: 45, client: 'Jan N.', service: 'Strzyżenie włosów' },
    { id: 8, day: 3, startHour: 13, startMinute: 0, duration: 60, client: 'Robert M.', service: 'Włosy + Broda' },
    { id: 9, day: 4, startHour: 9, startMinute: 0, duration: 45, client: 'Paweł L.', service: 'Strzyżenie włosów' },
    { id: 10, day: 4, startHour: 11, startMinute: 0, duration: 35, client: 'Dawid R.', service: 'Koloryzacja brody' },
    { id: 11, day: 4, startHour: 14, startMinute: 30, duration: 45, client: 'Łukasz T.', service: 'Strzyżenie włosów' },
    { id: 12, day: 5, startHour: 10, startMinute: 0, duration: 60, client: 'Grzegorz H.', service: 'Włosy + Broda' },
    { id: 13, day: 5, startHour: 13, startMinute: 30, duration: 45, client: 'Marcin J.', service: 'Strzyżenie włosów' },
  ],
  'Magda': [
    { id: 14, day: 1, startHour: 10, startMinute: 0, duration: 30, client: 'Wojciech A.', service: 'Strzyżenie brody' },
    { id: 15, day: 1, startHour: 11, startMinute: 30, duration: 40, client: 'Kamil B.', service: 'Golenie brzytwą' },
    { id: 16, day: 1, startHour: 15, startMinute: 0, duration: 50, client: 'Andrzej C.', service: 'Pielęgnacja premium' },
    { id: 17, day: 2, startHour: 9, startMinute: 0, duration: 30, client: 'Szymon D.', service: 'Strzyżenie brody' },
    { id: 18, day: 2, startHour: 11, startMinute: 0, duration: 40, client: 'Rafał E.', service: 'Golenie brzytwą' },
    { id: 19, day: 2, startHour: 14, startMinute: 0, duration: 30, client: 'Bartosz F.', service: 'Strzyżenie brody' },
    { id: 20, day: 3, startHour: 9, startMinute: 30, duration: 50, client: 'Mateusz G.', service: 'Pielęgnacja premium' },
    { id: 21, day: 3, startHour: 12, startMinute: 0, duration: 30, client: 'Jakub H.', service: 'Strzyżenie brody' },
    { id: 22, day: 3, startHour: 15, startMinute: 30, duration: 40, client: 'Dominik I.', service: 'Golenie brzytwą' },
    { id: 23, day: 4, startHour: 10, startMinute: 0, duration: 30, client: 'Sebastian J.', service: 'Strzyżenie brody' },
    { id: 24, day: 4, startHour: 13, startMinute: 0, duration: 50, client: 'Artur K.', service: 'Pielęgnacja premium' },
    { id: 25, day: 5, startHour: 9, startMinute: 0, duration: 40, client: 'Norbert L.', service: 'Golenie brzytwą' },
    { id: 26, day: 5, startHour: 11, startMinute: 30, duration: 30, client: 'Emil M.', service: 'Strzyżenie brody' },
    { id: 27, day: 5, startHour: 14, startMinute: 0, duration: 30, client: 'Filip N.', service: 'Strzyżenie brody' },
  ],
  'Kuba': [
    { id: 28, day: 1, startHour: 9, startMinute: 30, duration: 45, client: 'Oskar O.', service: 'Strzyżenie włosów' },
    { id: 29, day: 1, startHour: 12, startMinute: 0, duration: 60, client: 'Igor P.', service: 'Włosy + Broda' },
    { id: 30, day: 1, startHour: 16, startMinute: 0, duration: 45, client: 'Hubert R.', service: 'Strzyżenie włosów' },
    { id: 31, day: 2, startHour: 10, startMinute: 0, duration: 45, client: 'Leon S.', service: 'Strzyżenie włosów' },
    { id: 32, day: 2, startHour: 13, startMinute: 0, duration: 60, client: 'Bruno T.', service: 'Włosy + Broda' },
    { id: 33, day: 2, startHour: 16, startMinute: 30, duration: 45, client: 'Oliwier U.', service: 'Strzyżenie włosów' },
    { id: 34, day: 3, startHour: 9, startMinute: 0, duration: 45, client: 'Tymon W.', service: 'Strzyżenie włosów' },
    { id: 35, day: 3, startHour: 11, startMinute: 0, duration: 60, client: 'Alan X.', service: 'Włosy + Broda' },
    { id: 36, day: 3, startHour: 14, startMinute: 30, duration: 45, client: 'Kacper Y.', service: 'Strzyżenie włosów' },
    { id: 37, day: 4, startHour: 9, startMinute: 30, duration: 60, client: 'Nikodem Z.', service: 'Włosy + Broda' },
    { id: 38, day: 4, startHour: 12, startMinute: 0, duration: 45, client: 'Borys A.', service: 'Strzyżenie włosów' },
    { id: 39, day: 4, startHour: 15, startMinute: 0, duration: 35, client: 'Ksawery B.', service: 'Koloryzacja brody' },
    { id: 40, day: 5, startHour: 10, startMinute: 30, duration: 45, client: 'Tymoteusz C.', service: 'Strzyżenie włosów' },
    { id: 41, day: 5, startHour: 14, startMinute: 0, duration: 60, client: 'Olaf D.', service: 'Włosy + Broda' },
  ]
};

// Export appointments for use in Booking component
export const getAppointmentsForBarber = (barberName) => {
  return sampleAppointments[barberName] || [];
};

const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
const fullDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

// Generate time slots every 15 minutes from 9:00 to 19:00
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push({ hour, minute });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const BarberMiniSchedule = ({ barber, onClose, compact = false, selectedDate }) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);
  
  const appointments = sampleAppointments[barber.name] || [];

  // Get current week dates
  const getWeekDates = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    return days.map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date.getDate();
    });
  };

  const weekDates = getWeekDates();

  // Check if a specific 15-min slot is busy
  const getSlotStatus = (dayIndex, hour, minute) => {
    const slotStartMinutes = hour * 60 + minute;
    const slotEndMinutes = slotStartMinutes + 15;
    
    for (const apt of appointments) {
      if (apt.day !== dayIndex + 1) continue;
      
      const aptStartMinutes = apt.startHour * 60 + apt.startMinute;
      const aptEndMinutes = aptStartMinutes + apt.duration;
      
      // Check if this slot overlaps with the appointment
      if (slotStartMinutes < aptEndMinutes && slotEndMinutes > aptStartMinutes) {
        return { busy: true, appointment: apt };
      }
    }
    
    return { busy: false, appointment: null };
  };

  const formatTime = (hour, minute) => {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  };

  const getEndTime = (apt) => {
    const totalMinutes = apt.startHour * 60 + apt.startMinute + apt.duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    return formatTime(endHour, endMinute);
  };

  // Check if day matches selected date
  const isDaySelected = (dayIndex) => {
    if (!selectedDate) return false;
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return adjustedDay === dayIndex;
  };

  // Count busy slots
  const countBusySlots = () => {
    let busyCount = 0;
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      for (const slot of timeSlots) {
        if (getSlotStatus(dayIndex, slot.hour, slot.minute).busy) {
          busyCount++;
        }
      }
    }
    return busyCount;
  };

  const totalSlots = days.length * timeSlots.length;
  const busySlots = countBusySlots();
  const freeSlots = totalSlots - busySlots;

  return (
    <div className={`barber-mini-schedule ${compact ? 'barber-mini-schedule--compact' : ''}`}>
      <div className="barber-mini-schedule__header">
        <div className="barber-mini-schedule__barber">
          <span 
            className="barber-mini-schedule__avatar" 
            style={{ background: barber.color }}
          >
            {barber.name.charAt(0)}
          </span>
          <div className="barber-mini-schedule__info">
            <span className="barber-mini-schedule__name">{barber.name}</span>
            <span className="barber-mini-schedule__specialty">{barber.specialty}</span>
          </div>
        </div>
        {onClose && (
          <button className="barber-mini-schedule__close" onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <div className="barber-mini-schedule__legend">
        <div className="barber-mini-schedule__legend-item">
          <span className="barber-mini-schedule__legend-dot barber-mini-schedule__legend-dot--free"></span>
          Wolne
        </div>
        <div className="barber-mini-schedule__legend-item">
          <span className="barber-mini-schedule__legend-dot barber-mini-schedule__legend-dot--busy" style={{ background: barber.color }}></span>
          Zajęte
        </div>
        <div className="barber-mini-schedule__legend-info">
          Sloty co 15 min
        </div>
      </div>

      <div className="barber-mini-schedule__grid-wrapper">
        <div className="barber-mini-schedule__grid">
          {/* Header row with days */}
          <div className="barber-mini-schedule__corner">
            <span>Godz.</span>
          </div>
          {days.map((day, index) => (
            <div 
              key={day} 
              className={`barber-mini-schedule__day-header ${isDaySelected(index) ? 'selected' : ''}`}
            >
              <span className="barber-mini-schedule__day-name">{day}</span>
              <span className="barber-mini-schedule__day-date">{weekDates[index]}</span>
            </div>
          ))}

          {/* Time rows - every 15 minutes */}
          {timeSlots.map((slot, slotIndex) => (
            <>
              <div 
                key={`time-${slot.hour}-${slot.minute}`} 
                className={`barber-mini-schedule__time ${slot.minute === 0 ? 'barber-mini-schedule__time--hour' : ''}`}
              >
                {slot.minute === 0 ? `${slot.hour}:00` : ''}
              </div>
              {days.map((_, dayIndex) => {
                const { busy, appointment } = getSlotStatus(dayIndex, slot.hour, slot.minute);
                const slotKey = `${dayIndex}-${slot.hour}-${slot.minute}`;
                
                // Check if this is the start of an appointment
                const isAppointmentStart = appointment && 
                  appointment.startHour === slot.hour && 
                  appointment.startMinute === slot.minute;
                
                return (
                  <div
                    key={slotKey}
                    className={`barber-mini-schedule__slot ${busy ? 'busy' : 'free'} ${isDaySelected(dayIndex) ? 'day-selected' : ''} ${slot.minute === 0 ? 'hour-start' : ''}`}
                    style={busy ? { 
                      background: `${barber.color}25`,
                      borderLeftColor: barber.color 
                    } : {}}
                    onMouseEnter={() => appointment && setHoveredSlot({ ...appointment, slotKey })}
                    onMouseLeave={() => setHoveredSlot(null)}
                  >
                    {isAppointmentStart && (
                      <div className="barber-mini-schedule__apt-label" style={{ color: barber.color }}>
                        {formatTime(appointment.startHour, appointment.startMinute)}
                      </div>
                    )}
                    
                    {hoveredSlot?.slotKey === slotKey && appointment && (
                      <div className="barber-mini-schedule__tooltip">
                        <div className="barber-mini-schedule__tooltip-header" style={{ borderColor: barber.color }}>
                          <strong>{formatTime(appointment.startHour, appointment.startMinute)} - {getEndTime(appointment)}</strong>
                        </div>
                        <span className="barber-mini-schedule__tooltip-service">{appointment.service}</span>
                        <span className="barber-mini-schedule__tooltip-client">{appointment.client}</span>
                        <span className="barber-mini-schedule__tooltip-duration">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          {appointment.duration} min
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="barber-mini-schedule__footer">
        <div className="barber-mini-schedule__stats">
          <span className="barber-mini-schedule__stat">
            <span className="barber-mini-schedule__stat-value" style={{ color: '#2ecc71' }}>{freeSlots}</span>
            <span className="barber-mini-schedule__stat-label">wolnych</span>
          </span>
          <span className="barber-mini-schedule__stat">
            <span className="barber-mini-schedule__stat-value" style={{ color: barber.color }}>{busySlots}</span>
            <span className="barber-mini-schedule__stat-label">zajętych</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarberMiniSchedule;
