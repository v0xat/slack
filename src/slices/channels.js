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
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      return {
        ...state,
        // eslint-disable-next-line no-confusing-arrow
        channels: state.channels.map((ch) => ch.id === id ? { ...ch, name } : ch),
      };
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      return {
        currentChannelId: state.currentChannelId === id ? 1 : state.currentChannelId,
        channels: state.channels.filter((ch) => ch.id !== id),
      };
    },
  },
});

export const {
  initState, setCurrentChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
