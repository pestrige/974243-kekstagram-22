import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const effectSliderContainer = document.querySelector('.effect-level');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');

const updateSlider = (min = 1, max = 100, step = 1) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
};

noUiSlider.create(effectSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//По умолчанию слайдер скрыт
effectSliderContainer.classList.add('hidden');

export {effectSlider, updateSlider };
