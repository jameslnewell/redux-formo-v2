import * as validate from '../../shared/validate';

export default {

  existingCustomer: value => {

    if (validate.empty(value)) {
      return 'Please select an option.';
    }

  },

  existingCustomerNumber: (value, values) => {

    console.log(values['existingCustomer']);
    if (Boolean(values['existingCustomer'])) {

      if (validate.empty(value)) {
        return 'Please enter a customer number.';
      }

      if (!validate.numerical(value)) {
        return 'Please enter a valid customer number.';
      }

    }

  }

};
