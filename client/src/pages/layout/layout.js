import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Group from "@/pages/group/group";
import './layout.scss'

class Layout extends React.PureComponent {
  render() {
    return (
      <div className="layout">
        <Header></Header>
        <Group></Group>
        <Footer></Footer>
      </div>
    );
  }
}
export default Layout;
