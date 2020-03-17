import React, { PureComponent as Component } from 'react';
import { Form, Button, Input, Icon, message, Radio } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import './Login.scss';

class Login extends Component {
    handleSubmit(){
        axios.post('/api/user/login', {"email":"admin","password":"dj123456"})
        console.log(123);

    }
    render() {
        return(
          <Button onClick={this.handleSubmit}></Button>  
        )
    }
}

export default Login;