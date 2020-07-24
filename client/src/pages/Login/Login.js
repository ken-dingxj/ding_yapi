import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, message } from 'antd';
import './login.scss';
import { loginActions, registerActions } from '../../reducer/modules/user';

@connect(
    state => {
      return {
        loginData: state.user
      };
    },
    {
      loginActions,
      registerActions
    }
)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1 // type: 1 - login, 2 - register
        };
    }
    
    onFinish(values) {
        console.log('Success:', values);
        this.props.loginActions(values).then(res => {
            if (res.payload.data.success) {
                message.success(res.payload.data.msg);
                // 跳转逻辑
                this.props.history.replace('/group');
            }else {
                message.error(res.payload.data.msg);
            }
        }).catch(e => {
            console.log(e)
        });
    }

    getStart(values) {
        console.log('Success:', values);
        this.props.registerActions(values).then(res => {
            if (res.payload.data.success) {
                message.success(res.payload.data.msg);
                this.setState({
                    type: 1
                });
            }else {
                message.error(res.payload.data.msg);
            }
        }).catch(e => {
            console.log(e)
        });
    }

    forgetPassword() {
        console.log('this is forget password btn')
    }
    
    register() {
        console.log('this is register btn')
        this.setState({
            type: 2
        });
    }

    login() {
        console.log('this is login btn')
        this.setState({
            type: 1
        });
    }
    
    render(){
        let form, describe;
        if(this.state.type == 1) {
            describe = <div className="login-top-describe">
                            登录 Yapi 帐号，
                            <br/>
                            继续使用
                        </div>;
            form = <Form
                        className="basic-form login-form"
                        name="login-form"
                        onFinish={(values) => this.onFinish(values)}
                        key="login-form"
                        >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名或邮箱'
                                }
                            ]}
                        >
                            <Input 
                                placeholder="用户名或邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]}
                        >
                            <Input.Password 
                                placeholder="密码"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" className="login-form-forgetBtn text-btn" onClick={() => this.forgetPassword()}>忘记密码</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-submitBtn submit-btn">登录</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" className="login-form-registerBtn text-btn" onClick={() => this.register()}>注册</Button>
                        </Form.Item>
                    </Form>;
        }else {
            describe = <div className="login-top-describe">
                            验证邮箱以开始
                        </div>;
            form = <Form
                        className="basic-form register-form"
                        name="register-form"
                        key="register-form"
                        onFinish={(values) => this.getStart(values)}
                        >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱'
                                }
                            ]}
                        >
                            <Input 
                                placeholder="邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]}
                        >
                            <Input 
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]}
                        >
                            <Input.Password 
                                placeholder="密码"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-submitBtn submit-btn">即刻开始</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="link" className="register-form-loginBtn text-btn" onClick={() => this.login()}>账号密码登录</Button>
                        </Form.Item>
                    </Form>;
        }
        return(
            <div className="login">
                <div className="login-top-logo">
                    Yapi
                </div>
                {describe}
                {form}
            </div>
        )
    }
}

export default Login;