import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/carsSlice';
import './AddCarPage.css';

const AddCarPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    image: null 
  });
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await dispatch(addCar(form)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при добавлении машины:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({...form, image: file});
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="add-car-page">
      <h2>Добавить новую машину</h2>
      <form className="add-car-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Марка и модель</label>
          <input
            id="name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Например: Tesla Model S"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Фотография автомобиля</label>
          <input
            id="image"
            type="file"
            className="file-input form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
            disabled={isSubmitting}
          />
          {preview && (
            <img 
              src={preview} 
              alt="Превью" 
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            placeholder="Технические характеристики, особенности и т.д."
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Добавление...' : 'Добавить автомобиль'}
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;