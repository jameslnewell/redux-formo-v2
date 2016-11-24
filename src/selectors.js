//@flow

export const getForm = (state : Object, formName : string) => {

  if (!state.form) {
    return {};
  }

  if (!state.form[formName]) {
    return {};
  }

  return state.form[formName];
};

export const getFieldMeta = (state : Object, formName : string, fieldName : string) => {
  const form = getForm(state, formName);

  if (!form.metaByField) {
    return {};
  }

  if (!form.metaByField[fieldName]) {
    return {};
  }

  return form.metaByField[fieldName];
};

export const getFieldValues = (state : Object, formName : string) => {
  const form = getForm(state, formName);

  if (!form.valuesByField) {
    return {};
  }

  return form.valuesByField;
};

export const getFieldValue = (state : Object, formName : string, fieldName : string) => {
  const form = getForm(state, formName);

  if (!form.valuesByField) {
    return '';
  }

  if (typeof form.valuesByField[fieldName] === 'undefined') {
    return '';
  }

  return form.valuesByField[fieldName];
};

export const getFieldErrors = (state : Object, formName : string) => {
  const form = getForm(state, formName);

  if (!form.errorsByField) {
    return {};
  }

  return form.errorsByField;
};
export const getFieldError = (state : Object, formName : string, fieldName : string) => {
  const form = getForm(state, formName);

  if (!form.errorsByField) {
    return null;
  }

  if (typeof form.errorsByField[fieldName] === 'undefined') {
    return null;
  }

  return form.errorsByField[fieldName];
};

