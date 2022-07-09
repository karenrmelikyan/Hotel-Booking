import React, {useContext} from "react";
import "./navbar.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    function login() {
        navigate('/login');
    }

    return (
    <div className="navbar">
      <div className="navContainer">
          <Link style={{color: 'inherit', textDecoration: 'none'}} to={'/'}>
              <span className="logo">Hotel Booking</span>
          </Link>
             {
                user
                    ? user.username
                    :
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton" onClick={login}>Login</button>
                    </div>
            }
      </div>
    </div>
  )
}

export default Navbar