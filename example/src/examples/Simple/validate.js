import * as validate from '../../shared/validate';

export default {

  firstName: value => {

    if (validate.empty(value)) {
      return 'Please enter a first name.';
    }

    if (!validate.alphanum(value)) {
      return 'Please enter a valid first name.';
    }

    return true;
  },

  lastName: value => {

    if (validate.empty(value)) {
      return 'Please enter a last name.';
    }

    if (!validate.alphanum(value)) {
      return 'Please enter a valid last name.';
    }

    return true;
  },

  email: value => {

    if (validate.empty(value)) {
      return 'Please enter an email address.';
    }

    if (!validate.email(value)) {
      return 'Please enter a valid email address.';
    }

    return true;
  },

  message: value => {

    if (validate.empty(value)) {
      return true;
    }

    throw 'Uh oh! An error occurred during validation.';

  }

};
