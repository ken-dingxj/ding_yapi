import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import './layout.scss'

function Layout(Component){
  return (
    <div className="layout">
      <Header></Header>
      <Component/>
      <Footer></Footer>
    </div>
  );
}

export default Layout