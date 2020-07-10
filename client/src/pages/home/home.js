import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Footer from "@/components/footer/footer";

class Home extends React.PureComponent {
  render() {
    return (
      <div className="home">
        <Row>
          <div className="m-skew-bg">
            <div className="m-bg-mask m-bg-mask1"></div>
            <div className="m-bg-mask m-bg-mask0"></div>
            <div className="m-bg-mask m-bg-mask2"></div>
          </div>
          <div className="explain">
            <div className="title">为API开发者设计的管理平台</div>
            <div className="desc">
              让接口开发更简单高效，让接口的管理更具可读性、可维护性，让团队协作更合理。
            </div>
            <div className="section">
              <div className="section-item">
                <div className=" icon icon-interface-management"></div>
                <div className="title">项目管理</div>
                <div>提供基本的项目分组，项目管理，接口管理功能</div>
              </div>
              <div className="section-item">
                <div className="icon"></div>
                <div className="title">接口管理</div>
                <div>
                  友好的接口文档，基于websocket的多人协作接口编辑功能和类postman测试工具，让多人协作成倍提升开发效率
                </div>
              </div>
              <div className="section-item">
                <div className="icon"></div>
                <div className="title">MockServer</div>
                <div>基于Mockjs，使用简单功能强大</div>
              </div>
            </div>
            <div>
            <Link to={'/login'}>
            <button
                type="button"
                className="btn"
              >
                <span>登录 / 注册</span>
              </button>
            </Link>  
              
            </div>
          </div>
        </Row>
        <Row>
          <div className="jurisdiction">
            <div className="role">
              <div class="section-block block-first">
                <h4>超级管理员(* N)</h4>
                <p className="item"> - 创建分组</p>
                <p className="item"> - 分配组长</p>
                <p className="item"> - 管理所有成员信息</p>
              </div>
              <div>
                <div class="section-block block-second">
                  <h4>组长(* N)</h4>
                  <p className="item"> - 创建项目</p>
                  <p className="item"> - 管理分组或项目的信息</p>
                  <p className="item"> - 管理开发者与成员</p>
                </div>
              </div>
              <div>
                <div class="section-block block-third">
                  <h4>开发者(* N) / 成员(* N)</h4>
                  <p className="item"> - 不允许创建分组</p>
                  <p className="item"> - 不允许修改分组或项目信息</p>
                </div>
              </div>
            </div>
            <div className="text">
              <div></div>
              <div className="title">扁平化管理模式</div>
              <div className="desc">
                接口管理的逻辑较为复杂，操作频率高，层层审批将严重拖慢生产效率，因此传统的金字塔管理模式并不适用。
              </div>
              <div className="desc">
                YAPI
                将扁平化管理模式的思想引入到产品的权限管理中，超级管理员拥有最高的权限，并将权限分配给若干组长，超级管理员只需管理组长即可，实际上管理YAPI各大分组与项目的是“组长”。组长对分组或项目负责，一般由BU负责人/项目负责人担任。
              </div>
            </div>
          </div>
        </Row>
        <Row>
        <Footer></Footer>
        </Row>
      </div>
    );
  }
}
export default Home;
