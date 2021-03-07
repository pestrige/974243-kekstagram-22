import {effectSlider, updateSlider } from './slider.js';
import { previewImg, effectValueInput } from './popup-img.js';

const effectSliderContainer = document.querySelector('.effect-level');
const previewFilters = document.querySelector('.effects__list');
const defaultFilterRadio = previewFilters.querySelector('#effect-none');

const effects = [
  {
    name: 'effect-none',
    effect: () => 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'effect-chrome',
    effect: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'effect-sepia',
    effect: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'effect-marvin',
    effect: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'effect-phobos',
    effect: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    step: 0.1,
  },
  {
    name: 'effect-heat',
    effect: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    step: 0.1,
  },
];

// Действия по клику на превью фильтра
const onFilterClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const filterName = evt.target.id;

    // Находим нужный фильтр
    const {name, effect, min, max, step} = effects.find(effect => effect.name === filterName);

    // Применяем фильтр на картинку
    previewImg.style.filter = effect(max);
    updateSlider(min, max, step);

    // Подписываемся на изменение ползунка слайдера
    // и записываем значение в фильтр
    effectSlider.noUiSlider.on('update', (values, handle) => {
      effectValueInput.setAttribute('value', values[handle]);
      previewImg.style.filter = effect(effectValueInput.value);
    });

    // Скрываем ползунок на картинке без фильтра
    (name === 'effect-none') ? effectSliderContainer.classList.add('hidden') : effectSliderContainer.classList.remove('hidden');
  }
};

// Удаляем фильтры
const restoreFilters = () => {
  defaultFilterRadio.checked = true;
  effectSliderContainer.classList.add('hidden');
  previewImg.style.filter = 'none';
};

export { onFilterClick, restoreFilters };

