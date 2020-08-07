import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SearchItemSelection = (props) => {
  return (
    <Form style={{ width: '300px'}}>
      <FormGroup style={{boxShadow: '0 0 5px lightgrey'}}>
        <Input type="select" name="select">
          <option> </option>
          <option>Ventilator</option>
          <option>Masks</option>
          <option>Swabs</option>
          <option>Face Shields</option>
        </Input>
      </FormGroup>
    </Form>
  );
}

export default SearchItemSelection;
