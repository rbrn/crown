import './welcome.scss';

import React from 'react';
import { Form, Input, Button, Col, Row, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Support = props => {
  const onFinish = values => {
    axios.post('api/support', values)
      .then(({data}) => {
        Modal.success({
          content: 'Thank you for contacting us! We will get back to you shortly.',
        });
      })
  };

  function onChange(value) {
    // console.log("Captcha value:", value);
  }

  return (
    <div className="support padding-all-15" data-name="support">

      <Row>
        <Col span={11} style={{ boxShadow: '5px 0 1px -2px grey', textAlign: 'center', marginLeft: '60px', paddingRight: '45px'}}>

          <h1 style={{ marginTop: '5vh' }}>
            <b>Have Questions?</b> <FontAwesomeIcon icon={faPaperPlane} color='#FF7C48' />
          </h1>

          <Form
            name="normal_login"
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
              rules={[{required: true, message: 'Please input your message!'}]}
            >
              <Input.TextArea
                placeholder="Message"
                style={{ height: '120px', borderRadius: '10px'}}
              />
            </Form.Item>

            <ReCAPTCHA
              sitekey="6LcurqoZAAAAANOiRbwTC2nTSPMZIW7BRnYEwgst"
              onChange={onChange}
            />

            <Form.Item>
              <Button type="primary" htmlType="submit"
                style={{ position: 'absolute', right: '0px', borderRadius: '10px', fontSize: '20px', height:'40px'}}
                className="contact-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={10} style={{ textAlign: 'center', marginLeft:'110px', marginTop: '15vh'}}
        >

          {
            <div
              style={{ alignItems: 'center', width: '50vh' }}
          >

            <FontAwesomeIcon icon={faHandshake} color='#FF7C48' style={{height: '50px', width: '50px'}}/>{''}

            <div id="reach-out" style={{marginBottom: '20px'}}>
              If you are interested in supporting us, feel free to reach out at <a href="mailto:crownteaminternational@gmail.com">crownteaminternational@gmail.com</a>
            </div>

            <div id="partner-with" style={{marginBottom:'20px'}}>
              If you would like to partner with us, please email us at <a href="mailto:crownteaminternational@gmail.com">crownteaminternational@gmail.com</a>
          </div>

            <div id="icons">
              <a href="https://www.linkedin.com"> <img src='content/images/linkedin-icon.png' style={{ height: '25px', width: '25px' }} /></a>
              <a href="https://www.facebook.com"> <img src='content/images/fb-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px'}} /></a>
              <a href="https://www.youtube.com"><img src='content/images/yt-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px' }} /></a>
              <a href="https://www.twitter.com"><img src='content/images/twitter-icon.png' style={{ height: '25px', width: '25px', marginRight:'5px' }} /></a>
              <a href="https://www.instagram.com"><img src='content/images/ig-icon.png' style={{ height: '25px', width: '25px' }} /></a>
            </div>

          </div> }
        </Col>
      </Row>
    </div>
  )
}

export default Support;
