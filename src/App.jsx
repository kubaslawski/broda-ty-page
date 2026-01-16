import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ExpertsPage from './pages/ExpertsPage';
import GalleryPage from './pages/GalleryPage';
import BookingPage from './pages/BookingPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/uslugi" element={<ServicesPage />} />
            <Route path="/eksperci" element={<ExpertsPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/rezerwacja" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
