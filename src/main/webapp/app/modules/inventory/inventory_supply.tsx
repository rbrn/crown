import React, {Component} from "react";
import 'antd/dist/antd.css';
import { Input } from 'reactstrap'
import { Row, Space, Col } from 'antd'
class InventorySupply extends Component {

  render() {
    
    const dateFormat = 'YYYY/MM/DD';
    const handleChange = (value) => {
       // console.log(`selected ${value}`);
      }
    
    return (
       <div style={{ backgroundImage:`url('../../../content/images/background.png')` }}>

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
            <Input type="date" name="date" style={{fontSize:"16px", height:"50px", fontWeight:"bold", marginTop:"45px"}} className="shadow p-1 mb-5 bg-white rounded"/>
            <h5 style={{margin:"10px"}}>Choose Department</h5>
            <Input type="select" name="select" style={{fontSize:"16px", height:"50px", fontWeight:"bold", marginTop:"45px"}} className="shadow p-1 mb-5 bg-white rounded">
          <option> </option>
          <option>Emergency Department</option>
          <option>Recruiting Department</option>
          <option>Wholesale Department</option>
        </Input>
        </Space>
        </Col>
       </Row>
     </div>
     <div>
     <Row>
         <Col span={3}></Col>
      <Col span={8} style={{padding:"10px"}} className="shadow p-3 mb-5 bg-blue rounded">
      <p><h5>Medical Supplies will be needed</h5></p>
      <p>
          <Row style={{fontSize:"18px", lineHeight:'45px'}}>
      <Col span={12}>
          <p>ITEM</p>
          <p>Anesthesia</p>
          <p>Masks</p>
          <p>Sanitizers</p>
          <p>Medicine A</p>
          <p>Medicine B</p>
          </Col> 
      <Col span={12}>
      <p>QTY</p>
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
      <Col span={8} style={{padding:"10px"}} className="shadow p-3 mb-5 bg-blue rounded">
      <p><h5>Medical Equipments will be needed</h5></p>
      <p>
      <Row style={{fontSize:"18px", lineHeight:'45px'}}>
      <Col span={12}>
          <p>ITEM</p>
          <p>Respironics</p>
          <p>Bed</p>
          <p>Sanitizers</p>
          <p>Medicine A</p>
          <p>Medicine B</p>
          </Col> 
      <Col span={12}>
      <p>QTY</p>
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


export default InventorySupply;

