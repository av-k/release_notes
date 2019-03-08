import PT from 'prop-types';

export const overlaysPT = PT.arrayOf(
  PT.shape({
    id: PT.number.isRequired,
    message: PT.string.isRequired,
    status: PT.string.isRequired,
    type: PT.string.isRequired,
  })
);

export const historyPT = PT.objectOf(
  PT.oneOfType([PT.object, PT.func, PT.number, PT.string]),
);

export const childrenPT = PT.oneOfType([
  PT.element,
  PT.arrayOf(PT.element),
]);
