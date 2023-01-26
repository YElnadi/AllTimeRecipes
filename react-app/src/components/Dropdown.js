import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useState } from "react";
import './Dropdown.css'

const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <ul onClick={() => setDropdown(!dropdown)} className='menu'>
        <li>
          <LogoutButton />
        </li>
        <li>your profile</li>
      </ul>
    </>
  );
};

export default Dropdown;
