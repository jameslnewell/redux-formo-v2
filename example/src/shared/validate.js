
export const empty = value => typeof value === 'undefined' || value === null || value === '' || value === [];
export const alphabetical = value => /^[a-zA-Z]+$/.test(value);
export const numerical = value => /^[0-9]+$/.test(value);
export const email = value => /^.+@.+\..+$/.test(value);

