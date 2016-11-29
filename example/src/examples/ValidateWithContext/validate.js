import * as validate from '../../shared/validate';

export default {

  password: value => {

    if (validate.empty(value)) {
      return 'Please enter a password.';
    }

    if (!/[a-zA-Z]/.test(value)) {
      return 'Please enter a password with at least: 1 alphabetical character.';
    }

    if (!/[0-9]/.test(value)) {
      return 'Please enter a password with at least: 1 numerical character.';
    }

    if (!/[!@#$%^&*()_+]/.test(value)) {
      return 'Please enter a password with at least: 1 symbol character.';
    }

  },

  passwordConfirmation: (value, values) => {

    if (validate.empty(value)) {
      return 'Please confirm your password.';
    }

    if (value !== values['password']) {
      return 'Passwords do not match.';
    }

  }

};
