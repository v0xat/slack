import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    initState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      return { channels, currentChannelId };
    },
    setCurrentChannel: (state, { payload }) => {
      const { id } = payload;
      return { ...state, currentChannelId: id };
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    // removeChannel: (state, { payload }) => {
    //   // state.value -= 1;
    // },
    // renameChannel: (state, { payload }) => {
    //   // state.value += action.payload;
    // },
  },
});

export const { initState, setCurrentChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
