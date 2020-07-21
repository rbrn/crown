import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    // <div id="app-header">
    <div>
      {/* {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar dark expand="sm" fixed="top" style={{backgroundColor:'white'}} className="jh-navbar justify-content-between">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <span className="brand-info">Medical Supplies for All People, Forever.</span>
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" style={{}} >
            <Home />
            {props.isAuthenticated && <EntitiesMenu isAdmin={props.isAdmin}/>}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar> */}

      <Navbar color="light" light expand="md" className='shadow'>
        <NavbarBrand href="/"><Brand /></NavbarBrand>
        <NavbarToggler onClick={() => { }} />
        <Collapse isOpen={false} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className='text-dark' href="/request/">REQUEST</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='text-dark' href="/request/">SUPPLY</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className='text-dark' nav caret>
                Toronto, United States
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <span>
            <Nav>
              <NavItem>
                <NavLink className='text-dark' href="/request/">SUPPLY</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='text-dark' href="/request/">SUPPORT</NavLink>
              </NavItem>
              <NavItem>
                <Button className='header-btn'>SIGN UP</Button>
              </NavItem>
            </Nav>
          </span>

        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
