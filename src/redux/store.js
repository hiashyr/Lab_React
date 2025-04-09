import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice'; // Импорт нашего среза (заменит редьюсер)

export const store = configureStore({
  reducer: {
    cars: carsReducer, // Ключ 'cars' будет использоваться в useSelector
  },
});

export default store;