
export const empty = value => typeof value === 'undefined' || value === null || value === '' || value === [];
export const alphanum = value => /^[a-zA-Z]+$/.test(value);
export const email = value => /^.+@.+\..+$/.test(value);

