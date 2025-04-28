import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddCarPage from './pages/AddCarPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import { fetchCarsRequest } from './redux/actions/carActions';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(5);

  useEffect(() => {
    // Инициализация при загрузке приложения
    dispatch(fetchCarsRequest({ currentPage, carsPerPage }));
  }, [currentPage, carsPerPage, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              currentPage={currentPage}
              carsPerPage={carsPerPage}
              onPageChange={handlePageChange}
            />
          } 
        />
        <Route path="/add" element={<AddCarPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </Router>
  );
}

export default App;