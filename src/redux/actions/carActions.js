// Типы экшенов
export const FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_FAILURE = 'FETCH_CARS_FAILURE';
export const ADD_CAR_REQUEST = 'ADD_CAR_REQUEST';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_FAILURE = 'ADD_CAR_FAILURE';
export const RESET_CAR_ERROR = 'RESET_CAR_ERROR';

// Генераторы экшенов
export const fetchCarsRequest = (payload) => ({
  type: FETCH_CARS_REQUEST,
  payload
});

export const addCarRequest = (formData) => ({
  type: ADD_CAR_REQUEST,
  payload: formData
});

export const resetCarError = () => ({
  type: RESET_CAR_ERROR
});