import React, { PureComponent as Component } from 'react';
import { Form, Button, Input } from 'antd';
import './Login.scss';


class Login extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: "",
    //         password: ""
    //     };
    // }
    
    onFinish(values) {
        console.log('Success:', values);
    }

    forgetPassword() {
        console.log('this is forget password btn')
    }

    loginByCode() {
        console.log('this is login by code btn')
    }
    
    register() {
        console.log('this is register btn')
    }
    
    render(){
        return(
            <div className="login">
                <div className="login-top-logo">
                    Yapi
                </div>
                <div className="login-top-describe">
                    登录 Yapi 帐号，
                    <br/>
                    继续使用
                </div>
                <Form
                    className="login-form"
                    name="basic"
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的手机号码或邮箱'
                            }
                        ]}
                    >
                        <Input 
                            placeholder="你的手机号或工作邮箱"
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
                        <Button type="link" className="login-form-forgetBtn text-btn" onClick={this.forgetPassword}>忘记密码</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-submitBtn">登录</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" className="login-form-codeBtn text-btn" onClick={this.loginByCode}>验证码登录</Button>
                        <Button type="link" className="login-form-registerBtn text-btn" onClick={this.register}>注册</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login;