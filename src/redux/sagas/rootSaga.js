import { all } from 'redux-saga/effects';
import { watchCars } from './carSaga';

export default function* rootSaga() {
  yield all([
    watchCars()
  ]);
}