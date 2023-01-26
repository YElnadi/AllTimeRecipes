import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css";
import Dropdown from "./Dropdown";
import { useState } from "react";
import AddRecipe from "./AddRecipe";

const NavBar = ({}) => {
  const sessionUser = useSelector(state => state.session.user);
  const [dropdown, setDropdown]=useState(false)

  return (
    <nav>
      {sessionUser ?( 
      <i className="fa-solid fa-gear login-signup-btn" style={{fontSize:20}} 
      onMouseEnter={()=>setDropdown(true)} 
      onMouseLeave={()=>setDropdown(false)}> 
      {dropdown && <Dropdown/>}</i> )
      :(
      <div className="login-signup-btn">
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      </div>
      )}

      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>

      <div>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </div>
      
    </nav>
  );
};

export default NavBar;
