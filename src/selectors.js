
//TODO: move to Form/selectors
export const getForm = form => state => {

  if (!state.form) {
    return {};
  }

  if (!state.form[form]) {
    return {};
  }

  return state.form[form];
};

//TODO: move to Form/selectors
const getFormFields = form => state => {
  const formState = getForm(form)(state);

  if (!formState.fields) {
    return {};
  }

  return formState.fields;
};

//TODO: move to Field/selectors
export const getFormField = (form, field) => state => {
  const formFields = getFormFields(form)(state);

  if (!formFields[field]) {
    return {};
  }

  return formFields[field];
};

//TODO: move to Field/selectors
export const getFieldValue = (form, field) => state => {
  const formField = getFormField(form, field)(state);
  return formField.value;
};

//TODO: move to Field/selectors
export const getFieldValues = (form) => state => {
  const formFields = getFormFields(form)(state);

  const values = {};
  Object.keys(formFields).forEach(field => values[field] = formFields[field].value);
  return values;
};
