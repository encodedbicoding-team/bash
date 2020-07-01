import  { combineReducers } from 'redux';
import counterReducer from '../../features/counter/counterSlice';
import modalReducer from '../../features/globals/Modal';
import loginReducer from '../../features/authentication/login';
import httpGetReducer from '../../features/httpRequests/getRequests';
const reducers = combineReducers({
  counter: counterReducer,
  modal: modalReducer,
  login: loginReducer,
  httpGetRequests: httpGetReducer,
});

export default reducers;