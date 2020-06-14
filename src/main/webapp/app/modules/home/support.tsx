import './welcome.scss';

import React from 'react';
import {Form, Input, Button, Col, Row} from 'antd';

const Support = props => {
  const onFinish = values => {
    // console.log('Received values of form: ', values);
  };

  return (
    <div className="support padding-all-15" data-name="support">
      <Row>
        <Col span={6}>
          <h3>
            Have Questions?
          </h3>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{required: true, message: 'Please input your name!'}]}
            >
              <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{required: true, message: 'Please input your email!'}]}
            >
              <Input
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
            >
              <Input
                placeholder="Phone Number (Optional)"
              />
            </Form.Item>
            <Form.Item
              name="message"
            >
              <Input.TextArea
                placeholder="Message"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="contact-form-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Support;
