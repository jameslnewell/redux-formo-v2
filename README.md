# redux-formo

A framework for creating forms in React and Redux.

## Installation

```bash
npm install --save redux-formo
```

## Usage

```js
import {Form, Field} from 'redux-formo';

const validate = (field, value, values) => {

};

<Form name="contact">

  <label>
    First name: <br/>
    <Field name="first_name" component="input"/>
  </label>

  <label>
    Last name: <br/>
    <Field name="last_name" component="input"/>
  </label>

  <label>
    Email: <br/>
    <Field name="email" component="input"/>
  </label>

  <label>
    Message: <br/>
    <Field name="message" component="textarea"/>
  </label>

  <button type="submit">Send</button>

</Form>
```

## API

### Form

#### name

The form name.

> Required. A `string`.

#### children

The form children.

> Optional. May be one or more React nodes or a React component.

### Field

#### name

The field name.

> Required. A `string`.

#### children

The field children.

> Optional. May be a single React element or a React component. Should not be used in conjunction with the `component` property.

> React elements will be cloned with the relevant DOM props. React components will be passed all the field props.

For example:
```js
<Field name="terms-and-conditions">
  <input type="checkbox"/>
</Field>

//OR

<Field name="gender">
  {({name, ...otherProps}) => (
    <div>
      <label><input {...otherProps} type="checkbox" name={name} value="m"/> Male</label>
      <label><input {...otherProps} type="checkbox" name={name} value="f"/> Female</label>
    </div>
  )}
</Field>
```

## Change log

### 0.1.0

{Enter change information here}
