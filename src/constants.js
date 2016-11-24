//@flow
const PREFIX = '@redux-formo/';
const FIELD_PREFIX = `${PREFIX}field/`;
const FORM_PREFIX = `${PREFIX}form/`;

export const FIELD_FOCUS = `${FIELD_PREFIX}focus`;
export const FIELD_BLUR = `${FIELD_PREFIX}blur`;
export const FIELD_CHANGE = `${FIELD_PREFIX}change`;

export const FIELD_VALIDATE = `${FIELD_PREFIX}validate`;
export const FIELD_VALIDATE_OK = `${FIELD_PREFIX}validate/ok`;
export const FIELD_VALIDATE_ERR = `${FIELD_PREFIX}validate/error`;

export const FORM_SUBMIT = `${FORM_PREFIX}submit`;
export const FORM_SUBMIT_OK = `${FORM_PREFIX}submit/ok`;
export const FORM_SUBMIT_ERR = `${FORM_PREFIX}submit/error`;
