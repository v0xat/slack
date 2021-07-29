import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: null,
  reducers: {
    openModal: (state, { payload }) => {
      const { name, props } = payload;
      return { name, props };
    },
    closeModal: () => null,
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
