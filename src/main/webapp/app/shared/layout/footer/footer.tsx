import './footer.scss';

import React from 'react';
import {Col, Collapse, Nav, Navbar, NavbarToggler, Row} from 'reactstrap';
import {Brand, Home} from "app/shared/layout/header/header-components";
import {AccountMenu, AdminMenu, EntitiesMenu, LocaleMenu} from "app/shared/layout/menus";
import {Link} from "react-router-dom";

const Footer = props => (
  <div className="footer page-content container-fluid">
    <div className="copyright">
      &copy; 2020 CROWN
    </div>
    <div className="links">
      <Link to={`/policy`} className="link">
        Terms and Policy
      </Link>
      <Link to={`/support`} className="link">
        Support
      </Link>
      <Link to={`/about`} className="">
        About
      </Link>
    </div>
  </div>
);

export default Footer;
