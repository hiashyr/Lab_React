import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsRequest, resetCarError } from '../redux/actions/carActions';
import List from '../components/List/List';
import Pagination from '../components/Pagination/Pagination';
import './HomePage.css';

const HomePage = ({ currentPage, carsPerPage, onPageChange }) => {
  const dispatch = useDispatch();
  const { cars, loading, error, totalCars } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(fetchCarsRequest({ currentPage, carsPerPage }));
    
    // Сброс ошибки при размонтировании
    return () => {
      if (error) dispatch(resetCarError());
    };
  }, [currentPage, carsPerPage, dispatch]);

  return (
    <div className="home-page">
      <h1>Каталог автомобилей</h1>
      
      {error && (
        <div className="alert alert-danger">
          Ошибка: {error}
          <button 
            onClick={() => dispatch(resetCarError())}
            className="close-error"
          >
            ×
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="loading-spinner">Загрузка...</div>
      ) : cars.length === 0 ? (
        <div className="no-results">Автомобили не найдены</div>
      ) : (
        <>
          <List cars={cars} />
          {totalCars > carsPerPage && (
            <Pagination
              listPerPage={carsPerPage}
              totalList={totalCars}
              paginate={onPageChange}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;