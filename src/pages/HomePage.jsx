import React from 'react';
import List from '../components/List/List';
import Pagination from '../components/Pagination/Pagination';
import './HomePage.css';
import { useSelector } from 'react-redux';

const HomePage = ({ currentPage, carsPerPage, onPageChange }) => {
  // Получаем данные из нового пути state.cars
  const { cars, loading, totalCars } = useSelector(state => state.cars);

  return (
    <div className="home-page">
      <h1>Каталог автомобилей</h1>
      <List cars={cars} loading={loading} />
      
      {!loading && totalCars > carsPerPage && (
        <Pagination
          listPerPage={carsPerPage}
          totalList={totalCars}
          paginate={onPageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default HomePage;