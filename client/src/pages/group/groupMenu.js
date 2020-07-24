import React from 'react';
import { 
    Input,
    Menu,
    Modal,
    Form
} from 'antd';
import { 
    FolderAddOutlined,
    UserOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import './groupMenu.scss';

class GroupMenu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '个人空间',
            description: '盖世威名恨不得斩尽眼前宵小',
            searchValue: '',
            groupList: [
                {
                    id: '1',
                    groupName: '个人空间'
                },
                {
                    id: '2',
                    groupName: 'DJCPS'
                }
            ],
            selectedGroup: '',
            modalVisible: false,
            confirmLoading: false
        };
        this.formRef = React.createRef();
    }

    onSearch(event) {
        this.setState({
            searchValue: event.target.value
        });
        console.log(event.target.value)
    }

    onSelect(value) {
        this.setState({
            selectedGroup: value.key
        });
        console.log(value)
    }

    addGroup(e) {
        this.setState({
            modalVisible: true
        });
        console.log(e)
    }

    handleOk(e) {
        this.formRef.current.validateFields()
        .then(values => {
            console.log(values)
            this.setState({
                confirmLoading: true
            });
            setTimeout(() => {
                this.setState({
                    modalVisible: false,
                    confirmLoading: false
                });
            }, 2000);
        })
        .catch(errorInfo => {
            console.log(errorInfo)
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            modalVisible: false
        });
    }

    render(){
        const listItems = this.state.groupList.map((item) => {
                if (item.id === '1'){
                    return <Menu.Item key={item.id}><UserOutlined />{item.groupName}</Menu.Item>
                } else {
                    return <Menu.Item key={item.id}><FolderOpenOutlined />{item.groupName}</Menu.Item>
                }
            });

        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        };

        return (
            <div className="group-menu">
                <div className="g-head">
                    <div className="g-box1">
                        <span className="m-tt">{this.state.groupName}</span>
                        <FolderAddOutlined onClick={(e) => this.addGroup(e)}/>
                        <p className="m-des">简介：</p>
                        <p className="m-des">{this.state.description}</p>
                    </div>
                    <div className="g-box2">
                        <Input placeholder="搜索分组" value={this.state.searchValue} onChange={(e) => this.onSearch(e)}/>
                    </div>
                </div>
                <div className="g-list">
                    <Menu 
                        onClick={(value) => this.onSelect(value)} 
                        defaultSelectedKeys={['1']}
                    >{listItems}
                    </Menu>
                </div>
                <Modal
                    title="添加分组"
                    cancelText="取消"
                    okText="确定"
                    visible={this.state.modalVisible}
                    onOk={(e) => this.handleOk(e)}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={(e) => this.handleCancel(e)}
                    >
                    <Form
                        ref={this.formRef}
                        name="addGroup-form"
                        {...layout}
                        >
                        <Form.Item
                            name='groupName'
                            label="分组名"
                            rules={[{ 
                                required: true,
                                message: '分组名是必选字段'
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='description'
                            label="简介"
                            rules={[{
                                required: true,
                                message: '简介是必选字段'
                            }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name='groupLeader'
                            label="组长"
                            rules={[{ 
                                required: true,
                                message: '组长是必选字段'
                            }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default GroupMenu;