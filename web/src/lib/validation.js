export const validationTypes = {
  REQUIRED_TEXT: 'REQUIRED_TEXT',
  EMAIL: 'EMAIL',
  NOT_REQUIRED: 'NOT_REQUIRED',
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateInput(scheme, value) {
  switch (scheme) {
    case validationTypes.NOT_REQUIRED:
      return true;
    case validationTypes.REQUIRED_TEXT:
      return value !== '';
    case validationTypes.EMAIL:
      return emailRegex.test(value);
    default:
      throw new Error('Provide valid scheme for input validation!');
  }
}

export function validateForm(state, data) {
  return Object.keys(state).every((name) => {
    const { vldScheme } = state[name];
    const value = data[name];
    return validateInput(vldScheme, value);
  });
}
