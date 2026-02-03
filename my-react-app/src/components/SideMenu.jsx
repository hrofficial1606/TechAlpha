import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhone, FaHandshake } from "react-icons/fa";
import "../styles/SideMenu.css";

function SideMenu() {
  return (
    <div className="side-menu">
      <ul>

        <li>
          <NavLink to="/">
            <FaHome />Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/about">
            <FaInfoCircle /> About Us
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact">
            <FaPhone /> Contact
          </NavLink>
        </li>

        <li>
          <NavLink to="/sponsors">
            <FaHandshake /> Sponsors
          </NavLink>
        </li>

        <li>
          <NavLink to="/dev">
            <FaShoppingCart /> Shop
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default SideMenu;

