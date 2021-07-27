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
      const { id } = payload;
      const newChannels = [...state.channels, payload];
      return { currentChannelId: id, channels: newChannels };
    },
  },
});

export const {
  initState, setCurrentChannel, addChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
