// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  loginPath: () => [host, prefix, 'login'].join('/'),
  statePath: () => [host, prefix, 'data'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
