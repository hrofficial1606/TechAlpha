import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import "../styles/RightSideMenu.css";

function RightSideMenu() {

  const [open, setOpen] = useState(false);

  return (
    <div className={`rside-menu ${open ? "open" : ""}`}>

      {/* MOBILE TOGGLE BUTTON (ONLY VISIBLE ON MOBILE VIA CSS) */}
      <div className="rside-toggle" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* ORIGINAL ICON MENU (DESKTOP SAFE) */}
      <ul onClick={() => setOpen(false)}>

        <li>
          <NavLink to="https://www.instagram.com/techalfa_/">
            <FaInstagram />
          </NavLink>
        </li>
         <li>
          <NavLink to="https://www.instagram.com/techalfa_/">
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
