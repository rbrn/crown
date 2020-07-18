import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
class BuyerJourney extends Component {
  render () {
    const titleText = {
      color: '#707070',
      letterSpacing: '0px',
      font: 'Bold 30px/45px Montserrat',
      top: '270px'
    }
    const outerBoxStyles = {
      padding: '10px',
      border: '7px solid #FF7C48',
      opacity: '1',
      width: '50px'
    }

    const innerTopBox = {
      backgroundColor: '#FF7C48',
      opacity: '1',
      height: '40px',
      width: '40px',
      borderRadius: '7px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    const innerTopBoxText = {
      color: '#fff',
      textAlign: 'center' as const,
      paddingTop: '8px'
    }

    const innerParagraph = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const innerParagraphText = {
      textAlign: 'center' as const
    }

    const innerBottomBox = {
      position: 'absolute' as const,
      backgroundColor: '#5C4A56',
      padding: '10px',
      opacity: '1',
      borderRadius: '7px',
      left: 'auto',
      width: '180px',
      height: '38px',
      top: '212px'
    }

    const innerBottomBoxText = {
      marginBottom: '-5px',
      opacity: '1',
      color: '#fff',
      textAlign: 'center' as const,
      justifyItems: 'center',
      font: 'Bold 15px/20px Montserrat'
    }

    return (
      <div style={{ backgroundImage: `url('../../../content/images/background.png')` }}>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h5 style={titleText}>Get ready to place a Request</h5>
          </Col>
        </Row>
        <br />
        <br />
        <div>
          <Row>
            <Col span={4}></Col>
            <Col span={4} style={outerBoxStyles} className='shadow p-3 mb-5 bg-blue rounded'>
              <p style={innerTopBox}>
                <h6 style={innerTopBoxText}>1</h6>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>Check available medical supplies on map and order your medical supplies</span>
              </p>
              <br />
              <Link to='/buyer-landing'>
                <p style={innerBottomBox}>
                  <h6 style={innerBottomBoxText}>SUPPLY MAP</h6>
                </p>
              </Link>
            </Col>
            <Col span={2}></Col>
            <Col span={4} style={outerBoxStyles} className='shadow p-3 mb-5 bg-blue rounded'>
              <p style={innerTopBox}>
                <h5 style={innerTopBoxText}>2</h5>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>
                  Not finding your medical supply? Click here to submit your request for medical supplies
                </span>
              </p>
              <br />
              <p style={innerBottomBox}>
                <h5 style={innerBottomBoxText}>REQUEST</h5>
              </p>
            </Col>
            <Col span={2}></Col>
            <Col span={4} style={outerBoxStyles} className='shadow p-3 mb-5 bg-blue rounded'>
              <p style={innerTopBox}>
                <h5 style={innerTopBoxText}>3</h5>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>Arriving in the near future</span>
              </p>
              <br />
              <p style={innerBottomBox}>
                <h5 style={innerBottomBoxText}>ANALYZE DEMAND</h5>
              </p>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default BuyerJourney
