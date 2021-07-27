import { createSlice } from '@reduxjs/toolkit';
import { initState } from './channels.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      const newMessages = [...state.messages, payload];
      return { messages: newMessages };
    },
  },
  extraReducers: {
    [initState]: (state, { payload }) => {
      const { messages } = payload;
      return { messages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
