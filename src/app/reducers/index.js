import  { combineReducers } from 'redux';
import counterReducer from '../../features/counter/counterSlice';
import modalReducer from '../../features/globals/Modal';

const reducers = combineReducers({
  counter: counterReducer,
  modal: modalReducer,
});

export default reducers;