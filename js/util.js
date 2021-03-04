const ALERT_SHOW_TIME = 5000;
const mainPage = document.querySelector('main');

// Генерируем рандомное число

const getRandomNumber = (a = 0, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  // * Another solution
  // const min = Math.ceil((a < b) ? a : b);
  // const max = Math.floor((a >= b) ? a : b);

  if (min < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Проверяем длину строки

const checkMaxLength = (value = '', maxLength = 140) => value.length <= maxLength;

// Проверяем нажата ли Esc

const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

// Показываем сообщение об ошибке

const showAlert = (err) => {
  const alertContainer = document.createElement('div');

  alertContainer.classList.add('alert-message');
  alertContainer.textContent = `Ошибка: ${err}. Попробуйте позднее`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Показываем сообщение о загрузке изображения

const showMessage = (typeMessage) => {
  const container = document
    .querySelector(`#${typeMessage}`).content
    .querySelector(`.${typeMessage}`).cloneNode(true);

  const closeMessage = (evt) => {
    const closeBtn = container.querySelector('button');

    if (evt.target === container || evt.target === closeBtn) {
      evt.preventDefault();
      container.remove();
    }
  };

  const onMessageKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      container.remove();
      document.removeEventListener('keydown', onMessageKeydown);
    }
  };

  mainPage.append(container);
  container.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageKeydown);
};

// свой Debounce

const debounce = (fn, ms) => {
  let timeout;

  return function () {
    const callFn = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(callFn, ms);
  };
};

export { getRandomNumber, checkMaxLength, isEscEvent, showAlert, showMessage, debounce };
