// src/redux/carsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронные Thunk-actions
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ currentPage, carsPerPage }) => {
    const countRes = await axios.get('http://localhost:8080/list/all');
    const carsRes = await axios.get(
      `http://localhost:8080/list/lim?offset=${(currentPage - 1) * carsPerPage}&limit=${carsPerPage}`
    );
    return { cars: carsRes.data.list, totalCars: countRes.data.count };
  }
);

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (carData) => {
    const formData = new FormData();
    formData.append('image', carData.image);
    const uploadRes = await axios.post('http://localhost:8080/upload', formData);
    await axios.post('http://localhost:8080/list/add', {
      name: carData.name,
      description: carData.description,
      image_url: uploadRes.data.imageUrl,
    });
    return carData;
  }
);

// Создание среза
const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    loading: false,
    error: null,
    totalCars: 0,
  },
  reducers: {}, // Синхронные редьюсеры (если нужны)
  extraReducers: (builder) => {
    builder
      // Обработка fetchCars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Обработка addCar
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.unshift(action.payload); // Добавляем новую машину в начало массива
      });
  },
});

export default carsSlice.reducer;