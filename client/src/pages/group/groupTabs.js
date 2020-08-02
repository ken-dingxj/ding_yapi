import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { 
    Tabs,
    Button,
    Row,
    Col,
    Card,
    Avatar
} from 'antd';
import { 
    AuditOutlined,
    StarOutlined
} from '@ant-design/icons';
import './groupTabs.scss'; 

// const { TabPane } = Tabs;
const TabPane = Tabs.TabPane;

@withRouter

class GroupTabs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1',
            groupName: 'DJCPS',
            projectList: [
                {
                    id: '1',
                    projectName: '团购',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(0, 168, 84)',
                    collected: true
                },
                {
                    id: '2',
                    projectName: '供应商端',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(114, 101, 230)',
                    collected: true
                },
                {
                    id: '3',
                    projectName: '管理端',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(35, 149, 241)',
                    collected: false
                },
                {
                    id: '4',
                    projectName: '简易店铺',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(255, 191, 0)',
                    collected: false
                },
                {
                    id: '5',
                    projectName: '积分商城客户端',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(0, 168, 84)',
                    collected: false
                },
                {
                    id: '6',
                    projectName: '大客服服务',
                    icon: <AuditOutlined />,
                    backgroundColor: 'rgb(255, 191, 0)',
                    collected: false
                }
            ],
            menberList: [
                {
                    id: '1',
                    username: 'admin',
                    role: '组长'
                },
                {
                    id: '2',
                    username: 'baodongdong',
                    role: '组长'
                },
                {
                    id: '3',
                    username: 'chenlizhen',
                    role: '组员'
                },
                {
                    id: '4',
                    username: 'chenyong',
                    role: '组长'
                },
                {
                    id: '5',
                    username: 'dingxuejin',
                    role: '组长'
                }
            ]
        };
    }

    changeTabs(key) {
        this.setState = {
            activeKey: key
        }
    }

    addProject(e) {
        this.props.history.push('/add-project');
    }

    handlerCollect(e, id) {
        e.stopPropagation();
        // var obj = this.state.projectList.filter((item) => {
        //     return item.id === id
        // });
        // if (obj && obj[0]) {
        //     obj[0].collected = !obj[0].collected;
        // }
        var list = this.state.projectList;
        this.setState({
            projectList: list.map(item => {
                if (item.id === id) item.collected = !item.collected;
                return item
            })
        })
        console.log(this.state.projectList)
    }

    projectClick(id) {
        console.log('p:'+id)
    }

    render(){
        const cardList = this.state.projectList.map(item => {
            return (
                <Col xs={8} lg={6} xxl={4} key={item.id}>
                    <Card 
                        className='m-card'
                        bordered={false} 
                        hoverable 
                        onClick={(e) => this.projectClick(item.id)}>
                        <div className='m-star'>
                            <StarOutlined 
                                style={{color: item.collected ? 'rgb(255, 191, 0)' : 'rgba(39,56,72,.85)'}}
                                onClick={(e) => {this.handlerCollect(e, item.id)}}
                            />
                        </div>
                        <div className='m-icon'>
                            <Avatar style={{backgroundColor: item.backgroundColor}} icon={item.icon} />
                        </div>
                        <p>{item.projectName}</p>
                    </Card>
                </Col>
            )
        });

        const divList = this.state.menberList.map(item => {
            return (
                <div className="m-meb" key={item.id}>
                    <Row>
                        <Col span={16}>
                            <span className="m-user">
                                <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <Link to={`/user/${item.id}`}>{item.username}</Link>
                            </span>
                        </Col>
                        <Col span={8} style={{textAlign: "right"}}>
                            <span className="m-role">{item.role}</span>
                        </Col>
                    </Row>
                </div>
            )
        })

        return (
            <div className="group-tabs">
                <Tabs defaultActiveKey="1" onChange={(values) => this.changeTabs(values)} type="card">
                    <TabPane tab="项目列表" key="1">
                        <div className="m-pane m-pane1">
                            <div className="m-tip">
                                <Row>
                                    <Col span={16}>
                                        <p>{this.state.groupName} 分组共 ({this.state.projectList.length}) 个项目</p>
                                    </Col>
                                    <Col span={8} style={{textAlign: "right"}}>
                                        <Button type="primary" onClick={(e) => this.addProject(e)}>添加项目</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className="m-cards">
                                <Row gutter={16}>
                                    {cardList}
                                </Row>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="分组动态" key="2">
                        <div className="m-pane m-pane2">
                            <div className="m-tip">
                                <p>{this.state.groupName} 分组成员 ({this.state.menberList.length}) 人</p>
                            </div>
                            <div className="m-mebs">
                                {divList}
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default GroupTabs;