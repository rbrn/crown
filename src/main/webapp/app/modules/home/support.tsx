import './welcome.scss';

import React from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Support = props => {
  const onFinish = values => {
    // console.log('Received values of form: ', values);
  };

  return (
    <div className="support padding-all-15" data-name="support">

      <h1 style={{ alignItems: 'center', textAlign:'center' }}>
        <b>Have Questions?</b> <FontAwesomeIcon icon={faPaperPlane} color='#FF7C48' />
      </h1>

      <Row style={{alignItems:'center', textAlign:'center'}}>
        <Col span={6}>
          <Form
            name="normal_login"
            style={{width: '500px', height: '400px', marginTop: '20px'}}
            initialValues={{remember: true}}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Name" style={{ height: '50px', borderRadius: '10px'}}/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{required: true, message: 'Please input your email!'}]}
            >
              <Input
                type="email"
                placeholder="Email"
                style={{ height: '50px', borderRadius: '10px' }}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
            >
              <Input
                placeholder="Phone Number (Optional)"
                style={{ height: '50px', borderRadius: '10px' }}
              />
            </Form.Item>
            <Form.Item
              name="message"
            >
              <Input.TextArea
                placeholder="Message"
                style={{ height: '120px', borderRadius: '10px'}}
              />
            </Form.Item>

            <Form.Item style={{ position: 'absolute', left: '390px' }}>
              <Button type="primary" htmlType="submit"
                className="contact-form-button"
                style={{ borderRadius: '5px', height: '40px', width: '110px', textAlign: 'center', fontSize: '20px' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col className='rounded' style={{ boxShadow: '10px 0 1px -2px grey', marginLeft: '300px', width: '5px', height:'420px' }}>

          <div style={{ position: "absolute", textAlign: 'center', alignItems: 'center', width: '300px', left: '200px', top: '70px' }}>

            <FontAwesomeIcon icon={faHandshake} color='#FF7C48' style={{height: '50px', width: '50px'}}/>{''}

            <div id="reach-out" style={{marginBottom: '20px'}}>
              If you are interested in supporting us, feel free to reach out at <a href="mailto:wearecrown@gmail.com">wearecrown@gmail.com</a>
            </div>

            <div id="partner-with" style={{marginBottom:'20px'}}>
              If you would like to partner with us, please email us at <a href="mailto:crown.partner@gmail.com">crown.partner@gmail.com</a>
          </div>

            <div id="icons">
              <a href="https://www.linkedin.com"> <img src='content/images/linkedin-icon.png' style={{ height: '25px', width: '25px' }} /></a>
              <a href="https://www.facebook.com"> <img src='content/images/fb-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px'}} /></a>
              <a href="https://www.youtube.com"><img src='content/images/yt-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px' }} /></a>
              <a href="https://www.twitter.com"><img src='content/images/twitter-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px' }} /></a>
              <a href="https://www.instagram.com"><img src='content/images/ig-icon.png' style={{ height: '25px', width: '25px' }} /></a>
            </div>

          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Support;
