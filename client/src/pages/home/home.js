import React from 'react';
import './home.scss'
import { Link } from 'react-router-dom';

class Home extends React.PureComponent{
    render(){
        return(
          <div className="home-main">
            <Link to="/login"></Link>
          </div>
        )
    }
}
export default Home;