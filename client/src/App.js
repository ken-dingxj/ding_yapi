/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime: 2020-03-20 00:16:00
 * @LastEditors: dingxuejin
 */
import React,{Suspense} from "react";
// import { Route, BrowserRouter as Router } from "react-router-dom";
import { Route, HashRouter as Router } from "react-router-dom";
import AppRoute from "@/router/routes";
import { requireAuthentication } from "@/components/authenticatedComponent/authenticatedComponent";
import { lazy } from "react";
import Loading from "@/components/loading/loading";

class App extends React.PureComponent {
  route(){
    let r;
    r = (
      <Router getUserConfirmation={this.showConfirm}>
        <Suspense fallback={<Loading/>}>
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
         </Suspense>
      </Router>
    );
    return r;
  }
  render() {
    return this.route();
  }
}

export default App;
