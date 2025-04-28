import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  loading: false,
  error: null,
  totalCars: 0
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Обработка экшенов из саг
    builder
      .addCase('FETCH_CARS_REQUEST', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('FETCH_CARS_SUCCESS', (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCount;
      })
      .addCase('FETCH_CARS_FAILURE', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('ADD_CAR_SUCCESS', (state, action) => {
        state.cars.unshift(action.payload);
        state.totalCars += 1;
      });
  }
});

export const { resetError } = carsSlice.actions;
export default carsSlice.reducer;