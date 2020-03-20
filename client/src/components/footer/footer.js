import React from 'react';
import { Row, Col } from 'antd';
import './footer.scss'
import { GithubOutlined,UsergroupDeleteOutlined } from '@ant-design/icons';

class Header extends React.PureComponent{
    render(){
        return(
            <div className="footer-wrapper">
              <Col span={8}>
                <div className="item">
                  <GithubOutlined />
                  <span>GitHub</span>
                </div>
                <div>DApi 源码仓库</div>
              </Col>
              <Col span={8}>
                <div className="item">
                  <UsergroupDeleteOutlined />
                  <span>团队</span>
                </div>
                <div>DC</div>
                <div></div>
              </Col>
              <Col span={8}>
                  <div>Copyright © 2020 DC</div>
                  <div>版本:1.0.0</div>
                  <div>使用文档</div>
              </Col>
            </div>
        )
    }
}

export default Header;