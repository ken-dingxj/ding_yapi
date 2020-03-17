/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime: 2020-03-17 15:43:30
 * @LastEditors: dingxuejin
 */
import React,{Suspense} from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AppRoute from "@/router/routes";
import { requireAuthentication } from "@/components/authenticatedComponent/authenticatedComponent";
class App extends React.PureComponent {
  route(){
    let r;
    r = (
      <Suspense fallback={<div>Loading</div>}>
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
      </Suspense>
    );
    return r;
  }
  render() {
    return this.route();
  }
}

export default App;
