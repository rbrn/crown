import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    {/* <MenuItem icon="asterisk" to="/supply-point">
      <Translate contentKey="global.menu.entities.supplyPoint" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/resource">
      <Translate contentKey="global.menu.entities.resource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/supply-point-resource">
      <Translate contentKey="global.menu.entities.supplyPointResource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/delivery">
      <Translate contentKey="global.menu.entities.delivery" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/request-point">
      <Translate contentKey="global.menu.entities.requestPoint" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/request">
      <Translate contentKey="global.menu.entities.request" />
    </MenuItem>*/}
    <MenuItem icon="asterisk" to="/receiver-supplier">
      <Translate contentKey="global.menu.entities.receiverSupplier" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/receiver-resource">
      <Translate contentKey="global.menu.entities.receiverResource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/supplier-resource">
      <Translate contentKey="global.menu.entities.supplierResource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/resource-type">
      <Translate contentKey="global.menu.entities.resourceType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/claim">
      <Translate contentKey="global.menu.entities.claim" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
