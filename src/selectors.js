//@flow

export const getForm = (state : Object, formName : string) => {

  if (!state.forms) {
    return {};
  }

  if (!state.forms[formName]) {
    return {};
  }

  return state.forms[formName];
};

export const getFieldErrors = (state : Object, formName : string) => {
  const form = getForm(state, formName);

  if (!form.errorsByField) {
    return {};
  }

  return form.errorsByField;
};

export const getFieldValues = (state : Object, formName : string) => {
  const form = getForm(state, formName);

  if (!form.valuesByField) {
    return {};
  }

  return form.valuesByField;
};

export const isFormValid = (state : Object, formName : string) => {
  const fieldErrors = getFieldErrors(state, formName);
  return Object.keys(fieldErrors).every(field => fieldErrors[field] === null);
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

export const isFieldValid = (state : Object, formName : string, fieldName : string) => {
  const error = getFieldError(state, formName, fieldName);
  return typeof error === 'undefined' || error === null;
};
