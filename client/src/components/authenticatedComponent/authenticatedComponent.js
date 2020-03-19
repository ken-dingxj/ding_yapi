import React from 'react';
// import { connect } from 'react-redux';

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
              <div>
                <Component/> 
              </div>
            )
        }
    }
}