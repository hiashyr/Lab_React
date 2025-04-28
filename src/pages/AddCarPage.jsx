import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCarRequest, resetCarError } from '../redux/actions/carActions';
import './AddCarPage.css';

const AddCarPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    image: null 
  });
  const [preview, setPreview] = useState('');
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.cars);

  // Сброс ошибок при размонтировании
  useEffect(() => {
    return () => {
      dispatch(resetCarError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!form.image) {
      setLocalError('Пожалуйста, выберите изображение');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('image', form.image);
    
    dispatch(addCarRequest(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Ошибка добавления:', err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setLocalError('Размер файла не должен превышать 5MB');
        return;
      }
      setForm({...form, image: file});
      setPreview(URL.createObjectURL(file));
      setLocalError(null);
    }
  };

  const resetForm = () => {
    setForm({ name: '', description: '', image: null });
    setPreview('');
  };

  return (
    <div className="add-car-page">
      <h2>Добавить новую машину</h2>
      
      {(error || localError) && (
        <div className="alert alert-danger">
          {error?.message || localError}
          <button 
            onClick={() => {
              dispatch(resetCarError());
              setLocalError(null);
            }}
            className="close-error"
          >
            ×
          </button>
        </div>
      )}

      <form className="add-car-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Марка и модель*</label>
          <input
            id="name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Например: Tesla Model S"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Фотография автомобиля*</label>
          <input
            id="image"
            type="file"
            className="file-input form-control"
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/webp"
            required
            disabled={loading}
          />
          {preview && (
            <div className="image-preview-container">
              <img 
                src={preview} 
                alt="Превью" 
                className="image-preview"
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => {
                  setForm({...form, image: null});
                  setPreview('');
                }}
              >
                Удалить
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание*</label>
          <textarea
            id="description"
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            placeholder="Технические характеристики, особенности и т.д."
            required
            disabled={loading}
            rows={5}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={resetForm}
            disabled={loading}
          >
            Очистить
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading || !form.image}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Добавление...
              </>
            ) : 'Добавить автомобиль'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarPage;