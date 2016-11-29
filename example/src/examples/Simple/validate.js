import * as validate from '../../shared/validate';

export default {

  firstName: value => {

    if (validate.empty(value)) {
      return 'Please enter a first name.';
    }

    if (!validate.alphabetical(value)) {
      return 'Please enter a valid first name.';
    }

  },

  lastName: value => {

    if (validate.empty(value)) {
      return 'Please enter a last name.';
    }

    if (!validate.alphabetical(value)) {
      return 'Please enter a valid last name.';
    }

  },

  email: value => {

    if (validate.empty(value)) {
      return 'Please enter an email address.';
    }

    if (!validate.email(value)) {
      return 'Please enter a valid email address.';
    }

  },

  message: value => {

    if (!validate.empty(value)) {
      throw 'Uh oh! An error occurred during validation.';
    }

  }

};
