/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime: 2020-03-14 00:45:19
 * @LastEditors: dingxuejin
 */
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import Footer from "@/components/footer/footer";
import { requireAuthentication } from "@/components/authenticatedComponent/authenticatedComponent";

//方案一
let AppRoute = {
  home: {
    path: "/",
    component: Home
  },
  login: {
    path: "/login",
    component: Login
  }
};
class App extends React.PureComponent {
  route(){
    let r;
    r = (
      <Router getUserConfirmation={this.showConfirm}>
        {Object.keys(AppRoute).map(key => {
          let item = AppRoute[key];
          return key === "login" ? (
            <Route key={key} path={item.path} component={item.component} />
          ) : key === "home" ? (
            <Route
              key={key}
              exact
              path={item.path}
              component={item.component}
            />
          ) : (
            <Route
              key={key}
              path={item.path}
              component={requireAuthentication(item.component)}
            />
          );
        })}
      </Router>
    );
    return r;
  }
  render() {
    return this.route();
  }
}

export default App;
