import './welcome.scss';
import { Image } from 'react-bootstrap';

import React from 'react';
import { Button, Card, Col, Row } from 'reactstrap';

const About = props => (
  <div className="about padding-all-15" data-name="about">
    <Row>
      <Col className=".col-sm-12 .col-md-6 .offset-md-3">
        <h2 style={{ color: '#ff7c48' }}>
          ABOUT US
          </h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident accusamus nobis amet dolores labore iusto quis aliquam cumque. Doloribus ipsa similique laboriosam facilis velit eligendi optio sunt, sit modi ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quisquam maiores. Voluptatibus atque excepturi reprehenderit iste aliquid? Modi adipisci beatae ipsam repellat consequuntur? Illum enim autem nostrum cum delectus explicabo? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident accusamus nobis amet dolores labore iusto quis aliquam cumque. Doloribus ipsa similique laboriosam facilis velit eligendi optio sunt, sit modi ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quisquam maiores. Voluptatibus atque excepturi reprehenderit iste aliquid? Modi adipisci beatae ipsam repellat consequuntur? Illum enim autem nostrum cum delectus explicabo?</p>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident accusamus nobis amet dolores labore iusto quis aliquam cumque. Doloribus ipsa similique laboriosam facilis velit eligendi optio sunt, sit modi ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quisquam maiores. Voluptatibus atque excepturi reprehenderit iste aliquid? Modi adipisci beatae ipsam repellat consequuntur? Illum enim autem nostrum cum delectus explicabo?</p>

        <div className='text-center mt-5'>
          <h5 style={{ color: '#ff7c48' }}>OUR TEAM</h5>
        </div>
        <hr />
        <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>


          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>
          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>
          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>
          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>
          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>
          <div className="col-md-2 p-0 text-center">
            <Image width='100' src="https://i.pinimg.com/originals/2c/d2/71/2cd271b9d89b22a3b2fc780f6a838567.jpg" roundedCircle />
            <h6 className='m-0'>Heading</h6>
            {/* <br /> */}
            <span>user@email.com</span>
          </div>


        </div>

      </Col>
    </Row>
  </div>
);

export default About;
