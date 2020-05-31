import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

const img = 'content/images/crown-img.jpg';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" style={{height:'20px',width:'50px'}} alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      <img src={img} style={{height: '80px', width:'250px'}} />
    </span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <span>
        <div>Home</div>
      </span>
    </NavLink>
  </NavItem>

);
