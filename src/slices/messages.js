import { createSlice } from '@reduxjs/toolkit';
import { initState, removeChannel } from './channels.js';

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
    [removeChannel]: (state, { payload }) => {
      const { id } = payload;
      const filteredMessages = state.messages.filter(({ channelId }) => channelId !== id);
      return { messages: filteredMessages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
