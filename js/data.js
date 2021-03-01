import { showAlert } from './util.js';

// Получаем массив данных с сервера
const getData = (...onSuccess) => {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(`${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(data => {
      onSuccess.forEach(action => action(data));
    })
    .catch((err) => {
      showAlert(err);
    })
};

// Отправляем данные с формы

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    // mode: 'no-cors',
    // headers: {
    //   //'Accept': 'application/json, text/html, application/xhtml+xml, image/*',
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
