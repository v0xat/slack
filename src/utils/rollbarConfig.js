export default {
  accessToken: process.env.rollbar_token,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};
