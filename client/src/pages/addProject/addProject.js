import React, { PureComponent as Component } from 'react';
import { Form, Button, Input, Select, Radio, message, Tooltip, Row, Col } from 'antd';
import { PlusOutlined, QuestionCircleOutlined, LockOutlined } from '@ant-design/icons';
import './addProject.scss';

const { TextArea } = Input;
const { Option } = Select;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupsOptions: []
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getOptions();
    }
    
    getOptions() {
        this.setState({
            groupsOptions: [
                {
                    id: '1',
                    groupName: '个人空间'
                },
                {
                    id: '2',
                    groupName: 'DJCPS'
                }
            ]
        });
        this.formRef.current.setFieldsValue({
            groupBelong: '1',
            competence: 'private'
        })
    }

    addProject(val) {
        this.formRef.current.validateFields()
        .then(values => {
            console.log(values)
        })
        .catch(errorInfo => {
            console.log(errorInfo)
        });
    }
    
    render() {
        const layout = {
            labelCol: {
                lg: { span: 3 },
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                lg: { span: 21 },
                xs: { span: 24 },
                sm: { span: 14 }
            }
        };

        return (
            <div className="add-project">
                <div className="g-bg">
                    <Form
                        className="m-form"
                        ref={this.formRef}
                        name="addProject-form"
                        {...layout}
                        onFinish={val=>this.addProject(val)}
                        >
                        <Form.Item
                            name='projectName'
                            label="项目名称"
                            rules={[{ 
                                required: true,
                                message: '请输入项目名称，长度不超过100字符(中文算作2字符)!'
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='groupBelong'
                            label="所属分组"
                            rules={[{ 
                                required: true,
                                message: '请选择所属分组'
                            }]}>
                            <Select>
                                {this.state.groupsOptions.map(group => (
                                    <Option key={group.id} value={group.id}>{group.groupName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <hr className="m-line"></hr>
                        <Form.Item
                            name='basicPath'
                            label={
                                <label>
                                    基本路径&nbsp;
                                    <Tooltip title="接口基本路径，为空是根路径">
                                        <QuestionCircleOutlined/>
                                    </Tooltip>
                                </label>
                            }
                            rules={[{ 

                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='description'
                            label="描述"
                            rules={[{ 

                            }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name='competence'
                            label="权限"
                            rules={[{ 
                                required: true,
                                message: '请选择权限'
                            }]}>
                                <Radio.Group className="m-radio">
                                    <Radio value="private">
                                        <LockOutlined />私有
                                        <p>只有组长和项目开发者可以索引并查看项目信息</p>
                                    </Radio>
                                </Radio.Group>
                        </Form.Item>
                        <Row>
                            <Col lg={{offset: 3}} xs={{offset: 0}} sm={{offset: 6}} >
                                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>创建项目</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

export default User;