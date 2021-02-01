import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.styles.css";
import { useHistory } from "react-router-dom";

const Navigation = ({ customHeading }) => {

    const history = useHistory();
    const handleLogOut = () => {
      sessionStorage.removeItem('user')
      fetch('/api/v2/users/tokens', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: localStorage.getItem('token')
        },
        })
      localStorage.removeItem('token');
      sessionStorage.removeItem('currentId');
      sessionStorage.removeItem('userFromIndex')
      
      history.push("/")
    };
    
    return (
            <nav className="dt w-100 border-box pa3 ">
              <div className="dtc v-mid w-25">
                <Link to="/usersindex" className='f4 link dim white pa3 pointer'>
                    Users Index
                </Link>
                <Link to="/profile" className='f4 link dim white pa3 pointer'>
                    User Details
                </Link>
              </div>
              <div className="dtc v-mid w-50 tc" >
                  <h1 className="f2 tc titleFont white">{customHeading}</h1>
              </div>
              <div className="dtc v-mid w-80 tr" onClick={handleLogOut}>
                <span className="f4 link dim white pointer">Log Out</span>
              </div>
            </nav>

        );
}
    

export default Navigation; 
