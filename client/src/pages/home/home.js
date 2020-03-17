import React from 'react';
import './home.scss'
import { Link } from 'react-router-dom';
import { Row, Col, Button, Icon, Card } from 'antd';

class Home extends React.PureComponent{
    render(){
        return(
          <div className="home-main">
            <Link to="/login">
              <Button type="primary" className="btn-home btn-login">
                登录 / 注册
              </Button>
            </Link>
          </div>
        )
    }
}
export default Home;