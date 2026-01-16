import Booking from '../components/Booking';
import WeeklySchedule from '../components/WeeklySchedule';
import './BookingPage.css';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <section className="booking-page__hero">
        <div className="container">
          <span className="section-subtitle">Rezerwacja online</span>
          <h1 className="booking-page__title">Umów Wizytę</h1>
          <p className="booking-page__intro">
            Zarezerwuj wizytę w kilku prostych krokach. 
            Wybierz usługę, specjalistę i dogodny termin - zajmie Ci to tylko chwilę.
          </p>
        </div>
      </section>
      
      <Booking />
      
      <section className="booking-page__schedule section">
        <div className="container">
          <div className="booking-page__schedule-header">
            <span className="section-subtitle">Dostępność</span>
            <h2 className="section-title">Harmonogram Tygodnia</h2>
            <p className="booking-page__schedule-description">
              Sprawdź aktualny grafik naszych specjalistów i znajdź wolny termin.
              Kliknij na wizytę, aby zobaczyć szczegóły.
            </p>
          </div>
          <WeeklySchedule />
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
