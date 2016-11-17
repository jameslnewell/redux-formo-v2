
export const getForm = formName => state => {

  if (!state.form) {
    return {};
  }

  if (!state.form[formName]) {
    return {};
  }

  return state.form[formName];
};

export const getMeta = (formName, fieldName) => state => {
  const form = getForm(formName)(state);

  if (!form.metaByField) {
    return {};
  }

  if (!form.metaByField[fieldName]) {
    return {};
  }

  return form.metaByField[fieldName];
};

export const getValue = (formName, fieldName) => state => {
  const form = getForm(formName)(state);

  if (!form.valuesByField) {
    return '';
  }

  if (typeof form.valuesByField[fieldName] === 'undefined') {
    return '';
  }

  return form.valuesByField[fieldName];
};

export const getValues = (formName) => state => {
  const form = getForm(formName)(state);

  if (!form.valuesByField) {
    return {};
  }

  return form.valuesByField;
};
