import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Control = props => {

  const {
    label,
    active,
    dirty,
    validating,
    validated,
    valid,
    error,
    options,
    component: Component,
    ...otherProps
  } = props;

  const classes = classNames(
    'control',
    {
      'control--invalid': !valid
    }
  );

  const inputClasses = classNames(
    'control__input',
    {
      'control__input--active': active,
      'control__input--dirty': dirty
    }
  );

  return (
    <label className={classes}>
      <span className="control__label">{label}</span>
      {
        Component !== 'select'
        ? <Component {...otherProps} className={inputClasses}/>
        : (
          <select {...otherProps} className={inputClasses}>
            <option/>
            {Object.keys(options).map(option => (
              <option value={option}>{options[option]}</option>
            ))}
          </select>
        )
      }
      {error ? <span className="control__error">{error}</span> : null}
    </label>
  );

};

Control.defaultProps = {
  component: 'input',
  options: {}
};

export default Control;
