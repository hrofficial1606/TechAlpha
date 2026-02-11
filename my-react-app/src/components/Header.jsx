import { NavLink } from "react-router-dom";
import logo from "../assets/logoTechAlpha.png"
import "../styles/Header.css";
import { FaBuilding } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { GiTrophy } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";


function Header() {

  const [showBottomNav, setShowBottomNav] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {

    // only mobile
    if (window.innerWidth <= 768) {

      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowBottomNav(false); // hide
      } else {
        setShowBottomNav(true); // show
      }

      setLastScrollY(window.scrollY);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

  return (
    <div className="top-header">
     
       <div
          className="mobile-menu-btn"
          onClick={() => {
          document.querySelector(".side-menu")?.classList.toggle("active");
          document.querySelector(".menu-overlay")?.classList.toggle("active");
         }}> ☰ </div>

{/* DARK OVERLAY (MOBILE ONLY) */}
               <div
               className="menu-overlay"
                 onClick={() => {
                  document.querySelector(".side-menu")?.classList.remove("active");
                  document.querySelector(".menu-overlay")?.classList.remove("active");
               }}
            ></div>

      {/* LEFT LOGO */}
      <div className="logo">
        <span className="logo-span"><img src={logo} alt="" className="logoimg" /></span>
      </div>
        

      {/* CENTER MENU */}
      <div className="nav-links">
         <NavLink to="/acm">ACCOMMODATION</NavLink>
        <NavLink to="/workshops">WORKSHOPS</NavLink>
      <NavLink to="/hackthons">HACKATHON</NavLink>
      </div>
            
              {/* CENTER MENU */}
      <div className={`nav-btn ${showBottomNav ? "show-nav" : "hide-nav"}`}>

         <NavLink to="/"> <FaHome />Home </NavLink>
         <NavLink to="/acm"><FaBuilding /> ACCOMMODATION</NavLink>
        <NavLink to="/workshops"><GrWorkshop /> WORKSHOPS</NavLink>
      <NavLink to="/hackthons"><GiTrophy /> HACKATHON</NavLink>
      </div>
      {/* RIGHT BUTTON */}
      <button className="signin-btn">
        SIGN IN
      </button>

    </div>
  );
}

export default Header;
