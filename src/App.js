import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import AddCarPage from './pages/AddCarPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import './App.css';
import { fetchCars } from './redux/carsSlice';

function App() {
  // Получаем данные из Redux Toolkit store
  const { cars, loading, totalCars } = useSelector(state => state.cars);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(5);

  // Загрузка данных через RTK Thunk
  useEffect(() => {
    dispatch(fetchCars({ currentPage, carsPerPage }));
  }, [currentPage, carsPerPage, dispatch]);

  return (
    <Router>
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={
            <HomePage 
              cars={cars} 
              loading={loading}
              currentPage={currentPage}
              carsPerPage={carsPerPage}
              totalCars={totalCars}
              onPageChange={setCurrentPage}
            />
          } />
          <Route path="/add" element={
            <AddCarPage />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;