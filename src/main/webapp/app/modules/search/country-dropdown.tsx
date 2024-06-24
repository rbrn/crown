import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SearchCountrySelection = (props) => {
  return (
    <Form style={{ width: '300px' }}>
      <FormGroup style={{ boxShadow: '0 0 5px lightgrey' }}>
        <Input type="select" name="select">
          <option> </option>
          <option>United States</option>
          <option>Canada</option>
          <option>Romania</option>
          <option>Nigeria</option>
          <option>Zimbabwe</option>
          <option>Spain</option>
          <option>Istanbul</option>
        </Input>
      </FormGroup>
    </Form>
  );
}

export default SearchCountrySelection;
