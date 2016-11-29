import * as validate from '../../../shared/validate';

export default {

  message: value => {

    if (validate.empty(value)) {
      return 'Please list a few of your skills';
    }

  }

};
