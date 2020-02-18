import React from 'react';
import { Row, Col } from 'antd';
import './footer.scss'


class Header extends React.PureComponent{
    render(){
        return(
          <div className="footer-wrapper">
            <Row className="footer-container">
              <Row>
                <Col span={8}>1</Col>
                <Col span={8}>2</Col>
              </Row>
            </Row>
          </div>
        )
    }
}

export default Header;