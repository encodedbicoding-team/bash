import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: '',
    showingModal: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.showingModal = true;
      state.modalShow = action.payload
    },
    closeModal: state => {
      state.showingModal = false;
      state.modalShow = '';
    }
  }
})

export const { showModal, closeModal } = modalSlice.actions;
export const modalToShow = state => state.modalShow;

export default modalSlice.reducer;