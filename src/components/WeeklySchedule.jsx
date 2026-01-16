import { useState } from 'react';
import './WeeklySchedule.css';

// Sample appointments data
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

const barbers = [
  { id: 1, name: 'Agata', color: '#e74c3c' },
  { id: 2, name: 'Magda', color: '#9b59b6' },
  { id: 3, name: 'Kuba', color: '#3498db' }
];

const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const WeeklySchedule = () => {
  const [selectedBarber, setSelectedBarber] = useState(barbers[0]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getAppointmentsForBarber = (barberName) => {
    return sampleAppointments[barberName] || [];
  };

  const getAppointmentStyle = (appointment) => {
    const startMinutes = appointment.startHour * 60 + appointment.startMinute;
    const baseMinutes = 9 * 60; // Start at 9:00
    const top = ((startMinutes - baseMinutes) / 60) * 60; // 60px per hour
    const height = (appointment.duration / 60) * 60;
    
    return {
      top: `${top}px`,
      height: `${height}px`,
      backgroundColor: `${selectedBarber.color}20`,
      borderLeft: `3px solid ${selectedBarber.color}`
    };
  };

  const formatTime = (hour, minute) => {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  };

  const getEndTime = (appointment) => {
    const totalMinutes = appointment.startHour * 60 + appointment.startMinute + appointment.duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    return formatTime(endHour, endMinute);
  };

  const appointments = getAppointmentsForBarber(selectedBarber.name);

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

  return (
    <div className="weekly-schedule">
      <div className="weekly-schedule__header">
        <h3>Plan tygodniowy</h3>
        <div className="weekly-schedule__barber-tabs">
          {barbers.map((barber) => (
            <button
              key={barber.id}
              className={`weekly-schedule__barber-tab ${selectedBarber.id === barber.id ? 'active' : ''}`}
              onClick={() => setSelectedBarber(barber)}
              style={{ 
                '--barber-color': barber.color,
                borderColor: selectedBarber.id === barber.id ? barber.color : 'transparent'
              }}
            >
              <span className="weekly-schedule__barber-avatar" style={{ background: barber.color }}>
                {barber.name.charAt(0)}
              </span>
              {barber.name}
            </button>
          ))}
        </div>
      </div>

      <div className="weekly-schedule__grid-wrapper">
        <div className="weekly-schedule__grid">
          {/* Time column */}
          <div className="weekly-schedule__time-column">
            <div className="weekly-schedule__time-header"></div>
            {hours.map((hour) => (
              <div key={hour} className="weekly-schedule__time-slot">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day, dayIndex) => (
            <div key={day} className="weekly-schedule__day-column">
              <div className="weekly-schedule__day-header">
                <span className="weekly-schedule__day-name">{day}</span>
                <span className="weekly-schedule__day-date">{weekDates[dayIndex]}</span>
              </div>
              <div className="weekly-schedule__day-content">
                {/* Hour lines */}
                {hours.map((hour) => (
                  <div key={hour} className="weekly-schedule__hour-line"></div>
                ))}
                
                {/* Appointments */}
                {appointments
                  .filter((apt) => apt.day === dayIndex + 1)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="weekly-schedule__appointment"
                      style={getAppointmentStyle(appointment)}
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <span className="weekly-schedule__appointment-time">
                        {formatTime(appointment.startHour, appointment.startMinute)}
                      </span>
                      <span className="weekly-schedule__appointment-client">
                        {appointment.client}
                      </span>
                      <span className="weekly-schedule__appointment-service">
                        {appointment.service}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="weekly-schedule__legend">
        <div className="weekly-schedule__legend-item">
          <span className="weekly-schedule__legend-dot" style={{ background: selectedBarber.color }}></span>
          Wizyta u {selectedBarber.name}
        </div>
        <div className="weekly-schedule__stats">
          <span>Wizyt w tym tygodniu: <strong>{appointments.length}</strong></span>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="weekly-schedule__modal" onClick={() => setSelectedAppointment(null)}>
          <div className="weekly-schedule__modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="weekly-schedule__modal-close"
              onClick={() => setSelectedAppointment(null)}
            >
              ×
            </button>
            <div className="weekly-schedule__modal-header" style={{ borderColor: selectedBarber.color }}>
              <h4>Szczegóły wizyty</h4>
            </div>
            <div className="weekly-schedule__modal-body">
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Klient:</span>
                <span className="weekly-schedule__modal-value">{selectedAppointment.client}</span>
              </div>
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Usługa:</span>
                <span className="weekly-schedule__modal-value">{selectedAppointment.service}</span>
              </div>
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Dzień:</span>
                <span className="weekly-schedule__modal-value">{days[selectedAppointment.day - 1]}</span>
              </div>
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Godzina:</span>
                <span className="weekly-schedule__modal-value">
                  {formatTime(selectedAppointment.startHour, selectedAppointment.startMinute)} - {getEndTime(selectedAppointment)}
                </span>
              </div>
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Czas trwania:</span>
                <span className="weekly-schedule__modal-value">{selectedAppointment.duration} min</span>
              </div>
              <div className="weekly-schedule__modal-row">
                <span className="weekly-schedule__modal-label">Specjalista:</span>
                <span className="weekly-schedule__modal-value" style={{ color: selectedBarber.color }}>
                  {selectedBarber.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;

