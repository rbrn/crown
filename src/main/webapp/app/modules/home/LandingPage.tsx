/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Input } from 'antd';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const img = 'content/images/LOGO.png';
const image = 'content/images/5816.png';

export default () => {
    return (
        <div>
            <div className='cw-jumb jumbotron bg-blue text-white m-0' style={{
                // backgroundImage: `url(${image})`,
                height: '90vh',
                backgroundSize: '100% 110%',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className='col-sm-4 mt-5'>
                    <h1 className='text-white'>Medical Supplies for All People, Forever.</h1>
                    <p className='text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500.</p>
                    <div>
                        {/* <hi */}
                        <button type="submit" className="btn btn-primary shadow"><span>REQUEST</span></button>
                        <button style={{ backgroundColor: '#4698DC' }} type="submit" className="ml-4 shadow btn btn-primary text-white"><span>SUPPLY</span></button>
                    </div>
                </div>
            </div>


            <div className="album py-5 bg-light">
                <div className="container text-center">
                    <h2>Why Us?</h2>
                    <div className="row">

                        <div className="col-md-4">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '200px' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>Trust</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '200px' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>Peace of Mind</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '200px' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>Visibility</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className='jumbotron m-0'>
                <div className='text-center'>
                    <h3>About Us</h3>
                </div>
                <div className='container-fluid'>
                    <div>
                        <p>We are a medical supply marketplace designed to disrupt the current medical supply chain using advanced analytics to efficiently and dynamically match supply and demand to ensure we never have the shortage of 2020 again..</p>
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
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card mb-4 shadow-sm border border-secondary rounded-4" style={{ height: '150px', 
                            // backgroundImage: `url(${image})`, 
                            backgroundSize: '100% 100%' }}>
                                <div className="card-body">
                                    <p className="card-text bg-white" style={{ position: 'absolute', right: '-10px', top: '40%' }}>This is a wider .</p>
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


            <footer className="mt-0 pt-0 my-md-5 container pt-0">
                <div className="row">
                    <div className="col-5 col-md">
                        <h4>Legal</h4>
                        <img src={image} alt='' className='cw-footer-logo' />
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Terms</a></li>
                            <li><a className="text-muted" href="#">Privacy</a></li>
                            <li><a className="text-muted" href="#">Info</a></li>
                        </ul>
                    </div>
                    <div className="col-5 col-md">
                        <h4>Services</h4>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Request</a></li>
                            <li><a className="text-muted" href="#">Supply</a></li>
                            <li><a className="text-muted" href="#">Demand</a></li>
                            <li><a className="text-muted" href="#">Planning</a></li>
                            {/* <li><a className="text-muted" href="#">Another one</a></li>
                            <li><a className="text-muted" href="#">Last time</a></li> */}
                        </ul>
                    </div>
                    <div className="col-5 col-md">
                        <h4>NeedMy Med</h4>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">About Us</a></li>
                            <li><a className="text-muted" href="#">Our Partners</a></li>
                            <li><a className="text-muted" href="#">Support Us</a></li>
                            {/* <li><a className="text-muted" href="#">Final resource</a></li> */}
                        </ul>
                    </div>
                    <div className="col-5 col-md">
                        <h4>Get in touch wit us</h4>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Address: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</a></li>
                            <li><a className="text-muted" href="#">Tel: 604.XXX.XXXX</a></li>
                            <li><a className="text-muted" href="#">Fax: 604.XXX.XXXX</a></li>
                            <li><a className="text-muted" href="#">Email: info@needmymed.com</a></li>
                        </ul>
                    </div>
                </div>
            </footer>


            <div className='bg-gray text-center'>
                <i className='svg-inline--fa fa-flag fa-w-16 '></i>
            </div>

        </div>
    )
}

