import { createSlice } from '@reduxjs/toolkit';
import $ from 'jquery';
import { BASE_URL } from '../../utils/http';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    requestingLogin: false,
    loginSuccess: false,
    loginFailure: false,
    errorResponse: ''
  },
  reducers: {
    requestLogin: (state, action) => {
      state.requestingLogin = true;
    },
    loginFailure: (state, action) => {
      state.loginfailure = true;
      state.loginSuccess = false;
      state.requestingLogin = false;
    },
    loginSuccess: (state, action) => {
      state.loginSuccess = true;
      state.loginfailure = false;
      state.requestingLogin = false;
    },
    loginComplete: (state, action) => {
      state.requestingLogin = false
    },
    setError: (state, action) => {
      state.errorResponse = action.payload
    }
  },
})

export const { 
   requestLogin,
   loginSuccess,
   loginFailure,
   loginComplete,
   setError,
  } = loginSlice.actions;

export const login = (data) => async dispatch => {
  dispatch(requestLogin())
  return await $.ajax({
    type: 'POST',
    url: `${BASE_URL}/admin/users/login/`,
    data,
    dataType: 'json',
    error: (err) => {
      dispatch(loginFailure())
    },
    success: (data) => {
      dispatch(loginSuccess());
      return data;
    },
    complete: (data) => {
      dispatch(loginComplete())
      return data;
    }
  })
}

export default loginSlice.reducer;