const effectSlider = document.querySelector('.effect-level__slider');

const updateSlider = (min, max, step) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
};

// eslint-disable-next-line no-undef
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

effectSlider.setAttribute('disabled', true);

export {effectSlider, updateSlider };
