import React, {Component} from "react";
import 'antd/dist/antd.css';
import { Row, Calendar, Select, Layout, Button, Upload, Popconfirm, Space, Card, Col, DatePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
class Inventory extends Component {

  render() {
    
    const dateFormat = 'YYYY/MM/DD';
    const { Header, Footer, Sider, Content } = Layout;

    const { Option } = Select;

    const handleChange = (value) => {
       // console.log(`selected ${value}`);
      }
    
    return (
       <div>

    <br/>
    <div>
          <Row>
        <Col span={24} style={{textAlign:"center"}}><h2>Inventory or Supply Prediction</h2></Col>
          </Row>
    </div>
    <br/>
      <div>
      <Row>
        <Col span={24} style={{textAlign:"center"}}>
        <Space>
            <h5 style={{margin:"10px"}}>Choose Date</h5>
            <DatePicker style={{fontSize:"16px", height:"50px", fontWeight:"bold", marginTop:"45px"}} className="shadow p-1 mb-5 bg-white rounded" placeholder="03/03/2021" format={dateFormat}/>
            <h5 style={{margin:"10px"}}>Choose Department</h5>
            <Select defaultValue="Emergency Department" style={{fontSize:"16px", height:"50px", fontWeight:"bold", marginTop:"45px"}} className="shadow p-1 mb-5 bg-white rounded" onChange={handleChange}>
            <Option value="Emergency Department">Emergency Department</Option>
            <Option value="Recruiting Department">Recruiting Department</Option>
            <Option value="Wholesale Department">Wholesale Department</Option>
        </Select>
        </Space>
        </Col>
       </Row>
     </div>
     <div>
     <Row>
         <Col span={3}></Col>
      <Col span={8} style={{padding:"10px"}} className="shadow-lg p-3 mb-5 bg-blue rounded">
      <p><h5>Medical Supplies will be needed</h5></p>
      <p>
          <Row style={{fontSize:"18px"}}>
      <Col span={12}>
          <p>ITEM</p><br/>
          <p>Anesthesia</p>
          <p>Masks</p>
          <p>Sanitizers</p>
          <p>Medicine A</p>
          <p>Medicine B</p>
          </Col> 
      <Col span={12}>
      <p>QTY</p><br/>
      <p>50</p>
      <p>1000</p>
      <p>1000</p>
      <p>100</p>
      <p>200</p>
      </Col> 
      </Row>
      </p>
      </Col>
      <Col span={2}></Col>
      <Col span={8} style={{padding:"10px"}} className="shadow-lg p-3 mb-5 bg-blue rounded">
      <p><h5>Medical Equipments will be needed</h5></p>
      <p>
      <Row style={{fontSize:"18px"}}>
      <Col span={12}>
          <p>ITEM</p><br/>
          <p>Respironics</p>
          <p>Bed</p>
          <p>Sanitizers</p>
          <p>Medicine A</p>
          <p>Medicine B</p>
          </Col> 
      <Col span={12}>
      <p>QTY</p><br/>
      <p>50</p>
      <p>1000</p>
      <p>1000</p>
      <p>100</p>
      <p>200</p>
      </Col> 
      </Row>
      </p>
          </Col>
          <Col span={3}></Col>
    </Row>
  </div>

        </div> 
    );
  }
}

export default Inventory;