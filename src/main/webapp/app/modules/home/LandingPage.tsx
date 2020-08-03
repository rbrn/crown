/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Brand } from '../../shared/Layout/header/header-components';

const logo = 'content/images/LOGO.png';
const image = 'content/images/5816.png';

export default () => {
  return (
    <>
      {/* <Navbar color="light" light expand="md" className='shadow'>
                <NavbarBrand href="/"><Brand /></NavbarBrand>
                <NavbarToggler onClick={() => { }} />
                <Collapse isOpen={false} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className='text-dark nav-link' to="/buyer-journey">REQUEST</Link>
                        </NavItem>
                        <NavItem>
                            <Link className='text-dark nav-link' to="/seller-journey">SUPPLY</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className='text-dark nav-link' nav caret>
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
                                <Link className='text-dark nav-link' to="/about">ABOUT US</Link>
                            </NavItem>
                            <NavItem>
                                <Link className='text-dark nav-link' to="/support">SUPPORT</Link>
                            </NavItem>
                            <NavItem>
                                <Button className='header-btn shadow rounded'><Link to='/login'>SIGNUP</Link></Button>
                            </NavItem>
                        </Nav>
                    </span>
                </Collapse>
            </Navbar> */}
      <div>
        <div className='cw-jumb jumbotron bg-blue text-white m-0' style={{
          // backgroundImage: `url(${image})`,
          height: '90vh',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className='jumbo-text'>
            <h1 className='text-white jumbo-heading'>Medical Supplies for All People, Forever.</h1>
            <p className='text-white jumb-body'>Join our market place and get your medical supplies easily, trust-based and see what is happening in the marketplace NOW!</p>
            <div>
              {/* <hi */}
              <Link to='/buyer-journey'>
                <button type="submit" className="btn btn-primary shadow">
                  <span>
                    REQUEST
                                </span>
                </button>
              </Link>

              <Link to='/seller-journey'>
                <button style={{ backgroundColor: '#4698DC' }} type="submit" className="ml-4 shadow btn btn-primary text-white"><span>SUPPLY</span></button>
              </Link>
            </div>
          </div>
        </div>


        <div className="album py-5 bg-light">
          <div className="container text-center">
            <h5 className='section-heading why-us-headig mb-4'>Why Us?</h5>
            <div className="row">

              <div className="col-md-4">
                <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '250px', width: '250px' }}>
                  <div className="card-body ">
                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>Trust</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '250px', width: '250px' }}>
                  <div className="card-body ">
                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>Peace of Mind</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '250px', width: '250px' }}>
                  <div className="card-body ">
                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>Visibility</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className='jumbotron m-0 about-us-jumbo'>
          <div className='text-center'>
            <h3>About Us</h3>
          </div>
          <div className='container-fluid'>
            <div>
              <p className='about-us-text'>We are a medical supply marketplace designed to disrupt the current medical supply chain using advanced analytics to efficiently and dynamically match supply and demand to ensure we never have the shortage of 2020 again..</p>
            </div>
            <div className='cw-about-us-footer'>
              <Link to='/about'>Learn more about us</Link>
            </div>
          </div>

        </div>

        {/* Partners */}
        {/* <div className="album py-5 bg-light">
                <div className="container-fluid text-center">
                    <h4>Partners</h4>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="why-card card mb-4 shadow-sm border border-secondary cw-why-us-card" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body ">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-20px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


        {/* <div className='jumbotron text-center text-white mb-0' style={{ backgroundColor: '#4698DC' }}>
                <div className='container'>
                    <h4 className='text-white'>Partner with us</h4>
                    <h5 className='text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. been the industry's standard dummy text ever since the 1500s</h5>
                    <div className=''>
                        <Input className='col-md-4 mr-2 subscribe-input mt-2' type="email" name="email" id="exampleEmail" placeholder="Enter Email Here.." />
                        <Button className='subscribe-btn col-md-2 mb-2 pt-2 pb-2'>SUBSCRIBE NOW</Button>
                    </div>
                </div>
            </div> */}


        <footer className="mt-0 pt-0 my-md-5 pt-0">
          <div className="row">
            <div className="col-md-2">
              {/* <h4>Legal</h4> */}
              <img src={logo} alt='' className='cw-footer-logo' />
              <ul className="list-unstyled text-small footer-date">
                <li>(C) 2020 needmoremed <br />All Rights Reserved</li>
                <li>designed by bhanuprathap</li>
              </ul>
            </div>
            <div className="col-8 col-md">
              <h4 className='footer-header'>Medical Supplies <br />for All People, Forever</h4>
              <ul className="list-unstyled text-small row ml-1">
                <li><Link className="text-muted text-gray-1 span6 footer-links" to="/about">About Us</Link></li>
                <li><Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/buyer-journey">Request</Link></li>
                <li><Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/seller-journey">Supply</Link></li>
                <li><Link className="text-muted text-gray-1 ml-2 footer-links ml-4" to="/support">Support Us</Link></li>
                {/* <li><Link className="text-muted text-gray-1" to="/">Another one</Link></li>
                            <li><Link className="text-muted text-gray-1" to="/">Last time</Link></li> */}
              </ul>
            </div>

            <div className="col-md-3 ">
              <h4 className='text-gray-2 footer-right-heading'>Start a conversation</h4>
              <ul className="list-unstyled text-small footer-right">
                <li className="text-muted text-gray-1" >Email: info@needmoremed.com </li>
                <li className="text-muted text-gray-1" >Address: Toronto, Canada </li>
                <li className="text-muted text-gray-1" >Terms and Policy </li>
              </ul>
            </div>
          </div>
        </footer>


        <div className='bg-gray text-center'>
          <i className='svg-inline--fa fa-flag fa-w-16 '></i>
        </div>

      </div>
    </>
  )
}
