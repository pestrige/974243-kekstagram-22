//Generate Random Number

const getRandomNumber = (min = 0, max = 0) => {
  min = Math.ceil(min);
  max - Math.floor(max);

  if (min > max || min < 0 || max < 0) return alert('Введите корректный диапазон');

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumber(1, 20); // for ESLint Validation

//Check Max String Length

const checkMaxLength = (value = '', maxLength = 140) => value.length <= maxLength;

checkMaxLength(); // for ESLint Validation
