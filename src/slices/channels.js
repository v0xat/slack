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
      console.log(payload);
      const { id } = payload;
      return { ...state, channels: state.channels.filter((ch) => ch.id !== id) };
    },
  },
});

export const {
  initState, setCurrentChannel, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
