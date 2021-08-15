import * as yup from 'yup';

export default {
  loginSchema: () => yup.object().shape({
    username: yup.string()
      .required('Обязательное поле'),
    password: yup.string()
      .required('Обязательное поле'),
  }),
  signUpSchema: () => yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  }),
  messagesSchema: () => yup.object().shape({
    message: yup.string()
      .trim()
      .required()
      .max(256, 'Слишком длинное сообщение...'),
  }),
  channelsSchema: (channels) => yup.object().shape({
    channelName: yup.string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map(({ name }) => name), 'Название должно быть уникальным'),
  }),
};
