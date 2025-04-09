import React from 'react';
import './List.css';

const List = ({ cars = [], loading }) => {
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!cars || cars.length === 0) return <div className="no-cars">Машин не найдено</div>;

  return (
    <div className="car-list">
      {cars.map(car => (
        <div key={car.id} className="car-card">
          <div className="car-image-container">
            <img 
              src={car.image_url} 
              alt={car.name} 
              className="car-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          </div>
          <div className="car-info">
            <h3>{car.name}</h3>
            <p>{car.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;