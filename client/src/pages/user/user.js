import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Input, message, Row, Col, Upload, Tooltip } from 'antd';
import { UserOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './user.scss';

@connect(
    state => {
      return {
        loginData: state.user
      };
    }
)

@withRouter

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1, // 1：个人中心，2：他人资料
            id: '',
            username: '',
            email: '',
            createTime: '',
            updateTime: '',
            formType: {
                username: true,
                email: true,
                password: true    
            },
            input_username: '',
            input_email: '',
            input_oldPass: '',
            input_newPass: '',
            input_confirmPass: ''
        };
    }

    componentDidMount() {
        this.init(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps.match.params.id);
    }

    init(matchId) {
        if (matchId === this.props.loginData.uid) {
            this.setState({
                type: 1,
                id: this.props.loginData.uid,
                username: this.props.loginData.userName,
                email: this.props.loginData.email,
                createTime: this.props.loginData.add_time,
                updateTime: this.props.loginData.up_time,
                input_username: this.props.loginData.userName,
                input_email: this.props.loginData.email
            })
            console.log(this.props)
        }else {
            // 请求接口查询他人资料
            this.setState({
                type: 2,
                id: '159',
                username: 'gou',
                email: 'gou@djcps.com',
                createTime: '2020-03-05 13:21:37',
                updateTime: '2020-03-26 14:31:18',
                input_username: 'gou',
                input_email: 'gou@djcps.com'
            })
        }
    }

    /**
     * 
     * @param {*} type 
     * @param {*} bool 
     * @param {*} save 
     * type: 字段名
     * bool: true 展示文字， false 展示输入框
     * save: true 保存按钮
     */
    edit(type, bool, save) {
        // 保存
        if (save) {
            if (type==='username') {
                //请求接口
                //保存
                this.setState({
                    username: this.state.input_username
                })
            } else if (type==='email') {
                this.setState({
                    email: this.state.input_email
                })
            } else if (type==='password') {
                if (this.state.input_newPass !== this.state.input_confirmPass) {
                    message.error('两次输入的密码不一致');
                    return
                }
            }
        }
        // 设置展示状态
        let data = {};
        data[type] = bool;
        let formType = Object.assign({}, this.state.formType, data);
        this.setState({
            formType: formType
        })
        // 初始化输入框的值
        if (!bool) {
            this.setState({
                input_username: this.state.username,
                input_email: this.state.email,
                input_oldPass: '',
                input_newPass: '',
                input_confirmPass: ''
            })
        }
    }

    onInput(type, event) {
        let data = {};
        data[type] = event.target.value;
        let state = Object.assign({}, this.state, data);
        this.setState(state)
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
            message.error('图片的格式只能为 jpg、png！');
        }
        const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
            message.error('图片必须小于 200kb!');
        }
        return (isPNG || isJPG) && isLt2M;
    }

    upload(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        }
    }
    
    render() {
        return (
            <div className="user">
                <div className="g-bg">
                    <h3>{this.state.type === 1 ? "个人设置" : this.state.username + " 资料设置"}</h3>
                    <Row className="m-img">
                        { this.state.type === 1
                            ? (<Upload
                                    name="file"
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    onChange={(info)=>this.upload(info)}
                                    beforeUpload={(file)=>{this.beforeUpload(file)}}
                                    showUploadList={false}
                                    >
                                    <Tooltip title="点击头像更换
                                    (只支持jpg、png格式且大小不超过200kb的图片)" placement="right">
                                        <Avatar icon={<UserOutlined />}/>
                                    </Tooltip>
                                </Upload>)
                            : (<Avatar icon={<UserOutlined />}/>)
                        }
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>用户id</Col>
                        <Col span={12}>{this.state.id}</Col>
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>用户名</Col>
                        { this.state.formType.username
                            ? this.state.type === 1
                                ? (<Col span={12} >
                                        {this.state.username}
                                        <Button className="m-btn" icon={<EditOutlined />} onClick={()=>{this.edit('username', false)}}>修改</Button>
                                    </Col>) 
                                : (<Col span={12}>{this.state.username}</Col>)
                            : (<Col span={12}>
                                    <Input className="m-ipt" value={this.state.input_username} onChange={(e) => this.onInput('username', e)}></Input>
                                    <Button className="m-btn" onClick={()=>{this.edit('username', true)}}>取消</Button>
                                    <Button className="m-btn" onClick={()=>{this.edit('username', true, true)}} type="primary">确定</Button>
                                </Col>)}
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>Email</Col>
                        { this.state.formType.email
                            ? this.state.type === 1
                                ? (<Col span={12} >
                                        {this.state.email}
                                        <Button className="m-btn" icon={<EditOutlined />} onClick={()=>{this.edit('email', false)}}>修改</Button>
                                    </Col>) 
                                : (<Col span={12}>{this.state.email}</Col>)
                            :(<Col span={12}>
                                    <Input className="m-ipt" value={this.state.input_email} onChange={(e) => this.onInput('email', e)}></Input>
                                    <Button className="m-btn" onClick={()=>{this.edit('email', true)}}>取消</Button>
                                    <Button className="m-btn" onClick={()=>{this.edit('email', true, true)}} type="primary">确定</Button>
                                </Col>)}
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>创建账号时间</Col>
                        <Col span={12}>{this.state.createTime}</Col>
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>更新账号时间</Col>
                        <Col span={12}>{this.state.updateTime}</Col>
                    </Row>
                    <Row className="m-item">
                        <Col span={4}>密码</Col>
                        { this.state.formType.password ?
                            (<Col span={12}>
                                <Button icon={<EditOutlined />} onClick={()=>{this.edit('password', false)}}>修改</Button>
                            </Col>) : 
                            (<Col span={12}>
                                <div className="m-ipts">
                                    <Input.Password
                                        className="m-ipt" 
                                        placeholder="旧密码" 
                                        value={this.state.input_oldPass} 
                                        onChange={(e) => this.onInput('input_oldPass', e)}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    ></Input.Password>
                                    <Input.Password
                                        className="m-ipt" 
                                        placeholder="新密码" 
                                        value={this.state.input_newPass} 
                                        onChange={(e) => this.onInput('input_newPass', e)}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    ></Input.Password>
                                    <Input.Password
                                        className="m-ipt" 
                                        placeholder="确认密码" 
                                        value={this.state.input_confirmPass} 
                                        onChange={(e) => this.onInput('input_confirmPass', e)}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    ></Input.Password>
                                    <Button className="m-btn" onClick={()=>{this.edit('password', true)}}>取消</Button>
                                    <Button className="m-btn" onClick={()=>{this.edit('password', true, true)}} type="primary">确定</Button>
                                </div>
                            </Col>)}
                    </Row>
                </div>
            </div>
        )
    }
}

export default User;