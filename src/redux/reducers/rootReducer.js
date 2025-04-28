import { combineReducers } from 'redux';
import carsReducer from '../carsSlice';

export default combineReducers({
  cars: carsReducer
});