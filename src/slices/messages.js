import { createSlice } from '@reduxjs/toolkit';
import { initState, removeChannel } from './channels.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => (
      { ...state, messages: [...state.messages, payload] }
    ),
  },
  extraReducers: {
    [initState]: (state, { payload }) => {
      const { messages } = payload;
      return { messages };
    },
    [removeChannel]: (state, { payload }) => {
      const { id } = payload;
      return { ...state, messages: state.messages.filter(({ channelId }) => channelId !== id) };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
