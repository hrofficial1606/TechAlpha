import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhone, FaHandshake, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

function RightSideMenu() {
  return (
    <div className="rside-menu">
      <ul>

        <li>
          <NavLink to="https://www.instagram.com/widesoftech?igsh=MTl6OGg4NzZ6N3pnNQ==">
            <FaInstagram />
          </NavLink>
        </li>

        <li>
          <NavLink to="https://www.linkedin.com/company/widesoftech-pvt-ltd/">
            <FaLinkedin /> 
          </NavLink>
        </li>

       

        <li>
          <NavLink to="https://whatsapp.com/channel/0029Vb6spJsDTkJxQfxia02s">
            <FaWhatsapp /> 
          </NavLink>
        </li>

       

      </ul>
    </div>
  );
}

export default RightSideMenu;