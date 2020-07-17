import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  message,
  Input,
  Avatar,
  Menu,
  Dropdown
} from 'antd';
import { 
  HomeOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import './header.scss'
import { logoutActions } from '../../reducer/modules/user';

@connect(
  state => {
    return {
      loginData: state.user
    };
  },
  {
    logoutActions
  }
)

@withRouter

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchValue: ''
      };
    }

    onSearch(event) {
      this.setState({
        searchValue: event.target.value
      });
    }

    onMenuClick({ key }) {
      if (key === '1'){
        
      } else if (key === '2') {
        this.props.logoutActions().then(res => {
          if (res.payload.data.success) {
              message.success(res.payload.data.msg);
              // 跳转逻辑
              this.props.history.push('/');
          }else {
              message.error(res.payload.data.msg);
          }
        }).catch(e => {
            console.log(e)
        });
      }
    }

    render(){
        const menu = (
          <Menu onClick={(value) => this.onMenuClick(value)}>
            <Menu.Item key="1"><UserOutlined />个人中心</Menu.Item>
            <Menu.Item key="2"><PoweroffOutlined />退出</Menu.Item>
          </Menu>
        );
        return(
          <div className="layout-head">
            <div className="g-lft">
              <div className="m-logo f-fl">
                <Link to={'/index'}>
                  <HomeOutlined />
                </Link>
              </div>
              <div className="m-title f-fl">
                <span>个人空间</span>
              </div>
            </div>
            <div className="g-rgt">
              <div className="m-user f-fr">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a onClick={e => e.preventDefault()}>
                    <Avatar icon={<UserOutlined />} />
                    <DownOutlined />
                  </a>
                </Dropdown>
              </div>
              <div className="m-icon f-fr">
                <StarOutlined />
                <PlusCircleOutlined />
                <a target="_blank" href="https://hellosean1025.github.io/yapi/">
                  <QuestionCircleOutlined />
                </a>
              </div>
              <div className="m-sch f-fr">
                <Input placeholder="search" prefix={<SearchOutlined />} value={this.state.searchValue} onChange={(e) => this.onSearch(e)}/>
              </div>
            </div>
          </div>
        )
    }
}

export default Header;