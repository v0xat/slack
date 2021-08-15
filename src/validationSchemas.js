import * as yup from 'yup';

export default {
  loginSchema: (translation) => yup.object().shape({
    username: yup.string()
      .required(translation('yup.fieldRequired')),
    password: yup.string()
      .required(translation('yup.fieldRequired')),
  }),
  signUpSchema: (translation) => yup.object().shape({
    username: yup.string()
      .min(3, translation('yup.usernameLength'))
      .max(20, translation('yup.usernameLength'))
      .required(translation('yup.fieldRequired')),
    password: yup.string()
      .min(6, translation('yup.passLength'))
      .required(translation('yup.fieldRequired')),
    confirmPassword: yup.string()
      .required(translation('yup.fieldRequired'))
      .oneOf([yup.ref('password')], translation('yup.passEqual')),
  }),
  messagesSchema: (translation) => yup.object().shape({
    message: yup.string()
      .trim()
      .required()
      .max(256, translation('yup.messageLength')),
  }),
  channelsSchema: (translation, channels) => yup.object().shape({
    channelName: yup.string()
      .trim()
      .required(translation('yup.fieldRequired'))
      .min(3, translation('yup.channelLength'))
      .max(20, translation('yup.channelLength'))
      .notOneOf(channels.map(({ name }) => name), translation('yup.uniqueChannelName')),
  }),
};
