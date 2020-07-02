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
    allTransFailedData: null,
    requestingAllNewUsers: false,
    allNewUsersRequestSuccess: false,
    allNewUsersRequestFailed: false,
    allNewUsersFailedData: null,
    requestingSingleUserData: false,
    singleUserRequestSuccess: false,
    singleUserRequestFailed: false,
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
    },
    requestSingleUserData: (state, action) => {
      state.requestingSingleUserData = true;
    },
    singleUserDataRequestFailed: (state, action) => {
      state.singleUserRequestFailed = true;
      state.requestingSingleUserData = false;
    },
    singleUserDataRequestSuccess: (state, action) => {
      state.singleUserRequestSuccess = true;
      state.requestingSingleUserData = false;
    },
    requestAllTransactionsFailed: (state, action) => {
      state.requestingAllTransData = false;
      state.allTransFailedData=action.payload;
      state.allTransDataRequestFailed = true
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
  requestSingleUserData,
  singleUserDataRequestFailed,
  singleUserDataRequestSuccess,
  requestAllTransactionsFailed,
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
  const accepted_type = ['new', 'active'];
  if (!accepted_type.includes(data)) {
    return;
  } else {
    dispatch(requestAllNewUsersData())
    try {
      return await $.ajax({
        type: 'GET',
        url: `${BASE_URL}/admin/users/?${data === 'new' ? 'new=true' : 'active=true'}/`,
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
}

export const getSingleUserData = (id) => async dispatch => {
  dispatch(requestSingleUserData());
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  try {
    return await $.ajax({
      type: 'GET',
      url: `${BASE_URL}/admin/users/${id}/`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      success: (data) => {
        dispatch(singleUserDataRequestSuccess());
        return data;
      }
    })
  }catch(err) {
    dispatch(singleUserDataRequestFailed());
    dispatch(requestSingleUserData());
    return err;
  }
}

export const getTransactionsByCategory = (data) => async dispatch => {
  const access_token = sessionStorage.getItem('__bash__admin__<3_EBC');
  const accepted_type = ['purchases', 'withdrawals', 'deposits'];
  if (!accepted_type.includes(data)) {
    return;
  } else {
    dispatch(requestAllTransData());
    try {
      return await $.ajax({
        type: 'GET',
        url: `${BASE_URL}/admin/transactions/?type=${data}`,
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        success: (d) => {
          dispatch(requestAllTransDataSuccess());
          return d;
        }
      })
    }catch(err) {
      dispatch(requestAllTransactionsFailed(data))
      dispatch(requestAllTransData())
      return err; 
    }
  }
}

export default httpGetRequestsSlice.reducer;