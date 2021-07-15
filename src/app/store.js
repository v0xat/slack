import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channels.js';
import messagesReducer from '../slices/messages.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
