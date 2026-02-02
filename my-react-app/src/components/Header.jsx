import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="top-header">

      {/* LEFT LOGO */}
      <div className="logo">
        <span className="logo-span"><img src="../public/Image/logoTechAlpha.png" alt="" className="logoimg" /></span>
      </div>

      {/* CENTER MENU */}
      <div className="nav-links">
         <NavLink to="/dev">ACCOMMODATION</NavLink>
        <NavLink to="/workshops">WORKSHOPS</NavLink>
      <NavLink to="/hackthons">HACKATHON</NavLink>
      </div>

      {/* RIGHT BUTTON */}
      <button className="signin-btn">
        SIGN IN
      </button>

    </div>
  );
}

export default Header;
