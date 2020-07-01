import { createSlice } from '@reduxjs/toolkit';
import $ from 'jquery';
import { BASE_URL } from '../../utils/http';

export const httpGetRequestsSlice = createSlice({
  name: 'httpgetrequests',
  initialState: {
    requestingAllUsersData:  false,
    allUsersDataRequestSuccess: false,
    allUsersDataRequestsFailed: false,
    requestingAllBlocksData: false,
    allBlocksDataRequestSuccess: false,
    allBlocksDataFailure: false,
    requestingAllCategoriesData: false,
    allCategoriesDataRequestSuccess: false,
    allCategoriesDataRequestFailed: false,
    requestingAllTransData: false,
    allTransDataRequestSuccess: false,
    allTransDataRequestFailed: false,
    requestingAllNewUsers: false,
    allNewUsersRequestSuccess: false,
    allNewUsersRequestFailed: false,
    allNewUsersFailedData: null
  },
  reducers: {
    requestAllUsersData: (state, action) => {
      state.requestingAllUsersData = true;
    },
    requestAllUsersDataSuccess: (state, action) => {
      state.allUsersDataRequestSuccess = true;
      state.requestingAllUsersData = false;
    },
    requestAllUsersDataFailed: (state, action) => {
      state.requestingAllUsersData = false;
      state.allUsersDataRequestsFailed = true;
    },
    requestAllBlocksData: (state, action) => {
      state.requestingAllBlocksData = true;
    },
    requestAllBlocksDataSuccess: (state, action) => {
      state.allUsersDataRequestSuccess = true;
      state.requestingAllBlocksData = false;
    },
    requestAllBlocksDataFailed: (state, action) => {
      state.allUsersDataRequestsFailed = true;
      state.requestingAllBlocksData = false;
    },
    requestAllCategoriesData: (state, action) => {
      state.requestingAllCategoriesData = true;
    },
    requestAllCategoriesDataSuccess: (state, action) => {
      state.requestingAllCategoriesData = false;
      state.allCategoriesDataRequestSuccess = true;
    },
    requestAllCategoriesDataFailed: (state, action) => {
      state.requestingAllCategoriesData = false;
      state.allUsersDataRequestsFailed = true
    },
    requestAllTransData: (state, action) => {
      state.requestingAllTransData = true;
    },
    requestAllTransDataSuccess: (state, action) => {
      state.requestingAllTransData = false;
      state.allTransDataRequestSuccess = true;
    },
    requestAllTransDataFailed: (state, action) => {
      state.requestingAllTransData = false;
      state.allTransDataRequestsFailed = true
    },
    requestAllNewUsersData: (state, action) => {
      state.requestingAllNewUsers = true;
    },
    requestAllNewUsersSuccess: (state, action) => {
      state.requestingAllNewUsers = false;
      state.allNewUsersRequestSuccess = true;
      state.allNewUsersFailedData = null;
    },
    requestAllNewUsersFailed: (state, actions) => {
      state.requestingAllNewUsers = false;
      state.allNewUsersRequestFailed = true;
      state.allNewUsersFailedData = actions.payload;
    }
  }
})

export const {
  requestAllUsersData,
  requestAllUsersDataSuccess,
  requestAllUsersDataFailed,
  requestAllBlocksData,
  requestAllBlocksDataSuccess,
  requestAllBlocksDataFailed,
  requestAllCategoriesData,
  requestAllCategoriesDataFailed,
  requestAllCategoriesDataSuccess,
  requestAllTransData,
  requestAllTransDataSuccess,
  requestAllTransDataFailed,
  requestAllNewUsersData,
  requestAllNewUsersSuccess,
  requestAllNewUsersFailed,
} = httpGetRequestsSlice.actions

export const getAllUsers = () => async dispatch => {
  dispatch(requestAllUsersData());
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  try{
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/admin/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (data) => {
        dispatch(requestAllUsersDataSuccess());
        return data
      },
    })
  }catch(err) {
    dispatch(requestAllUsersDataFailed());
    dispatch(requestAllUsersData());
    return err;
  }
}

export const getAllBlocksData = () => async dispatch => {
  dispatch(requestAllBlocksData())
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  try{
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/blocks/`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (data) => {
        dispatch(requestAllBlocksDataSuccess());
        return data
      },
    })
  }catch(err) {
    dispatch(requestAllBlocksDataFailed());
    dispatch(requestAllBlocksData());
    return err;
  }
}

export const getAllCategoriesData = () => async dispatch => {
  dispatch(requestAllCategoriesData())
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  try {
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/admin/quiz/categories/`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (data) => {
        dispatch(requestAllCategoriesDataSuccess());
        return data;
      }
    })
  }catch(err) {
    dispatch(requestAllCategoriesDataFailed());
    dispatch(requestAllCategoriesData());
    return err;
  }
}

export const getAllTransData = () => async dispatch => {
  dispatch(requestAllTransData())
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  try {
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/admin/transactions/`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (data) => {
        dispatch(requestAllTransDataSuccess())
        return data;
      }
    })
  }catch(err) {
    dispatch(requestAllTransDataFailed())
    dispatch(requestAllTransData())
    return err; 
  }
}

export const getUsersByCategory = (data) => async dispatch => {
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  dispatch(requestAllNewUsersData())
  try {
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/admin/users/?${data === 'new' ? 'new=true' : 'active=true'}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (d) => {
        dispatch(requestAllNewUsersSuccess());
        return d;
      }
    })
  }catch(err) {
      dispatch(requestAllNewUsersFailed(data));
      dispatch(requestAllNewUsersData())
      return err;
  }

}

export default httpGetRequestsSlice.reducer;