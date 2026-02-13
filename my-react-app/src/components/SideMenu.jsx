import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhone, FaHandshake } from "react-icons/fa";
import "../styles/SideMenu.css";

import { FaInstagram, FaWhatsapp,FaLinkedin } from "react-icons/fa";


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
        {/* MOBILE SOCIAL LINKS */}

<li className="mobile-social">
  <a
    href="https://www.instagram.com/widesoftech?igsh=MTl6OGg4NzZ6N3pnNQ=="
    target="_blank"
    rel="noreferrer"
  >
    <FaInstagram />
    Instagram <br/>WideSoftech
  </a>
</li>
<li className="mobile-social">
  <a
    href="https://www.instagram.com/techalfa_?igsh=MzV0bHpvaXV5Y2tn"
    target="_blank"
    rel="noreferrer"
  >
    <FaInstagram />
    Instagram <br/>TechAlfa
  </a>
</li>

<li className="mobile-social">
  <a
    href="https://www.linkedin.com/company/widesoftech-pvt-ltd/"
    target="_blank"
    rel="noreferrer"
  >
    <FaLinkedin />
    LinkedIn
  </a>
</li>

<li className="mobile-social">
  <a
    href="https://whatsapp.com/channel/0029Vb6spJsDTkJxQfxia02s"
    target="_blank"
    rel="noreferrer"
  >
    <FaWhatsapp />
    WhatsApp
  </a>
</li>


      </ul>
      
    </div>
  );
}

export default SideMenu;

