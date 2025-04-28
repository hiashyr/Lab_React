import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_CARS_REQUEST,
  ADD_CAR_REQUEST,
  fetchCarsSuccess,
  fetchCarsFailure,
  addCarSuccess,
  addCarFailure
} from '../actions/carActions';

const API_BASE = 'http://localhost:8080';

function* fetchCars(action) {
  try {
    const { currentPage, carsPerPage } = action.payload;
    
    // Исправленный параллельный вызов
    const [carsRes, countRes] = yield all([
      call(axios.get, `${API_BASE}/list/lim?offset=${(currentPage - 1) * carsPerPage}&limit=${carsPerPage}`),
      call(axios.get, `${API_BASE}/list/all`)
    ]);
    
    yield put({
      type: 'FETCH_CARS_SUCCESS',
      payload: {
        cars: carsRes.data.list,
        totalCount: countRes.data.count
      }
    });
  } catch (error) {
    yield put({
      type: 'FETCH_CARS_FAILURE',
      payload: error.message
    });
  }
}

function* addCar(action) {
  try {
    const formData = action.payload;
    const uploadRes = yield call(
      axios.post,
      `${API_BASE}/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    
    const carRes = yield call(
      axios.post,
      `${API_BASE}/list/add`,
      {
        name: formData.get('name'),
        description: formData.get('description'),
        image_url: uploadRes.data.imageUrl
      }
    );
    
    yield put({
      type: 'ADD_CAR_SUCCESS',
      payload: carRes.data
    });
  } catch (error) {
    yield put({
      type: 'ADD_CAR_FAILURE',
      payload: error.message
    });
  }
}

export function* watchCars() {
  yield takeLatest(FETCH_CARS_REQUEST, fetchCars);
  yield takeLatest(ADD_CAR_REQUEST, addCar);
}