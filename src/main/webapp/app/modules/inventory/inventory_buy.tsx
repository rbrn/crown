import React, {Component} from "react";
import 'antd/dist/antd.css';
import { Row, Col } from 'antd'
class InventoryBuy extends Component {

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
        <Col span={24} style={{textAlign:"center"}}><h2>Inventory Buy</h2></Col>
          </Row>
    </div>
    <br/>
     <div>
     <Row>
         <Col span={3}></Col>
      <Col span={8} style={{padding:"10px"}} className="shadow p-3 mb-5 bg-blue rounded">
      <p><h5>Medical Supplies in need</h5></p>
      <p>
          <Row style={{fontSize:"18px", lineHeight:'45px'}}>
      <Col span={12}>
          <p>ITEM</p>
          <p>Ventilators</p>
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
      <p style={{float:'right'}}>
      <button style={{border:'none',backgroundColor:"transparent",position: 'absolute',bottom: 15, marginLeft:'-65px'}}><img src="url('../../../content/images/add.png" alt="add icon" style={{height:'55px',width:'55px'}} /></button></p>
      </Col>
      <Col span={2}></Col>
      <Col span={8} style={{padding:"10px"}} className="shadow p-3 mb-5 bg-blue rounded">
      <p><h5>Receipt</h5></p>
      <p>
      <Row style={{fontSize:"18px", lineHeight:'45px'}}>
      <Col span={12}>
          <p>Sub-Total</p>
          <p>Shipping Charges</p>
          <p>Discount</p>
          <p style={{color:'#000'}}><b>Total</b></p>
          </Col> 
      <Col span={12}>
      <p>$ 30000000</p>
      <p>$ 300</p>
      <p>$ 25</p>
      <p style={{color:'#000'}}><b>$ 3000325</b></p>
      </Col> 
      </Row>
      </p>
      <p style={{float:'right'}}>
      <button style={{border:'none',backgroundColor:"transparent",position: 'absolute',bottom: 15, marginLeft:'-65px'}}><img src="url('../../../content/images/print.png" alt="print icon" style={{height:'55px',width:'55px'}} /></button> 
     
      </p>
          </Col>
          <Col span={3}></Col>
    </Row>
  </div>

        </div> 
    );
  }
}

export default InventoryBuy;