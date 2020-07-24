import React from 'react';
// import { connect } from 'react-redux';
import Layout from "@/pages/layout/layout";

export function requireAuthentication(Component){
    // return @connect(
    //     state => {
    //       return {
    //         isAuthenticated: state.user.isLogin
    //       };
    //     },
    //     {
    //       changeMenuItem
    //     }
    //   )
    return class AuthenticatedComponent extends React.PureComponent {
        render(){
            return (
              <div style={{height: '100%'}}>
                {/* <Component/>  */}
                {Layout(Component)}
              </div>
            )
        }
    }
}