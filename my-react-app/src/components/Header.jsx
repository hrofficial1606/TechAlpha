import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoTechAlpha.png";
import "../styles/Header.css";

import { FaBuilding } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { GiTrophy } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

import { useEffect, useState } from "react";
import { getStoredUser } from "../utils/auth";

function Header() {

  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const user = getStoredUser();
    const firstName = user?.fullName?.trim()?.split(/\s+/)[0] || null;
    setUserName(firstName);
    setUserAvatar(user?.profileImage || null);
  }, [location.pathname]);

  useEffect(() => {

    const handleScroll = () => {

      if (isHomePage) return;

      if (window.innerWidth <= 768) {

        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowBottomNav(false);
        } else {
          setShowBottomNav(true);
        }

        setLastScrollY(window.scrollY);
      }

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [lastScrollY]);

  return (
    <div className="top-header">

      {/* MOBILE MENU BUTTON */}
      <div
        className="mobile-menu-btn"
        onClick={() => {
          document.querySelector(".side-menu")?.classList.toggle("active");
          document.querySelector(".menu-overlay")?.classList.toggle("active");
        }}
      >
        ☰
      </div>

      {/* DARK OVERLAY */}
      <div
        className="menu-overlay"
        onClick={() => {
          document.querySelector(".side-menu")?.classList.remove("active");
          document.querySelector(".menu-overlay")?.classList.remove("active");
        }}
      ></div>

      {/* LOGO */}
      <div className="logo">
        <span className="logo-span">
          <img src={logo} alt="" className="logoimg" />
        </span>
      </div>

      {/* DESKTOP NAV */}
      <div className="nav-links">
        <NavLink to="/acm">ACCOMMODATION</NavLink>
        <NavLink to="/workshops">WORKSHOPS</NavLink>
        <NavLink to="/gallery">GALLERY</NavLink>
        <NavLink to="/hackthons">HACKATHON</NavLink>
      </div>

      {/* MOBILE NAV */}
      <div className={`nav-btn ${showBottomNav ? "show-nav" : "hide-nav"}`}>

        <NavLink to="/">
          <FaHome /> Home
        </NavLink>

        <NavLink to="/acm">
          <FaBuilding /> ACCOMMODATION
        </NavLink>

        <NavLink to="/workshops">
          <GrWorkshop /> WORKSHOPS
        </NavLink>

        <NavLink to="/gallery">
          Gallery
        </NavLink>

        <NavLink to="/hackthons">
          <GiTrophy /> HACKATHON
        </NavLink>

      </div>

      {/* RIGHT BUTTON */}

      {userName ? (

        <button className="signin-btn user-greeting-btn" onClick={() => navigate("/profile")}>
          {userAvatar ? <img src={userAvatar} alt={userName || "Profile"} className="header-avatar" /> : null}
          Hi, {userName}
        </button>

      ) : (

        <button
          className="signin-btn"
          onClick={() => navigate("/login")}
        >
          SIGN IN
        </button>

      )}

    </div>
  );
}

export default Header;
