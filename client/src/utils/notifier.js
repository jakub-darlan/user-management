import { Notify } from 'quasar';

const notifyError = (message) => {
  Notify.create({
    type: 'negative',
    message,
  });
};

const notifySuccess = (message) => {
  Notify.create({
    type: 'positive',
    message,
  });
};

export { notifyError, notifySuccess };
