import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SearchRegionSelection = (props) => {
  return (
    <Form style={{ width: '300px' }}>
      <FormGroup style={{ boxShadow: '0 0 5px lightgrey' }}>
        <Input type="select" name="select">
          <option> </option>
          <option>Africa</option>
          <option>Austrailia</option>
          <option>Europe</option>
          <option>India</option>
          <option>North America</option>
          <option>South America</option>
        </Input>
      </FormGroup>
    </Form>
  );
}

export default SearchRegionSelection;
