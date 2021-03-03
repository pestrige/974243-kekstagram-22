import { getRandomNumber } from './util.js';

const RANDOM_POSTS_COUNT = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersList = filtersContainer.querySelectorAll('.img-filters__button');

const isFilter = (element) => element.classList.contains('img-filters__button');
const showFilterContainer = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

// Сортировка по количеству комментариев
const discussedFilter = (array) => {
  return array
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
};

// Выборка из случайных N-элементов
const randomFilter = (array) => {
  const resultedArray = [];
  while (resultedArray.length < RANDOM_POSTS_COUNT) {
    const randomItem = array[getRandomNumber(0, array.length - 1)];
    const isDublicate = () => resultedArray.some(item => item === randomItem)

    if (!isDublicate()) {
      resultedArray.push(randomItem);
    }
  }
  return resultedArray;
};

// Обертка, принимающая данные с сервера и функцию рендера превьюшек постов
const setFilterClick = (arrayFromServer, callback) => {
  // Подписываемся на клик по кнопке фильтра
  filtersContainer.addEventListener('click', (evt) => {
    if (!(isFilter(evt.target))) {
      return false;
    }

    const filter = evt.target;
    const filterId = evt.target.id;

    filtersList.forEach((item) => item.classList.remove('img-filters__button--active'));
    filter.classList.add('img-filters__button--active');

    // В зависимости от кнопки сортируем посты
    switch (filterId) {
      case 'filter-default':
        return callback(arrayFromServer);

      case 'filter-random':
        return callback(randomFilter(arrayFromServer));

      case 'filter-discussed':
        return callback(discussedFilter(arrayFromServer));
    }
  })
}
export { showFilterContainer, setFilterClick };
