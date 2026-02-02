import React, { useEffect } from "react";
import "../styles/Contact.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import { NavLink } from "react-router-dom";

import { FaMailBulk } from "react-icons/fa";
import { FaLocationPin, FaPhone } from "react-icons/fa6";

function Contact() {

  useEffect(() => {

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");

    const scrollReveal = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", scrollReveal);
    scrollReveal();

    return () => window.removeEventListener("scroll", scrollReveal);

  }, []);

  return (
    <div className="contact-page">

      <Header />
      <SideMenu />
      <RightSideMenu />

      <section className="contact-section">

        {/* GLASS CONTACT CARD */}
        <div className="contact-card floating-card reveal">

          <div className="contact-box">
            <NavLink
              to="mailto:info@techalpha.in"
              className="contact-link"
            >
              <FaMailBulk />
           
            <span>info@techalpha.in</span>
             </NavLink>
          </div>

          <div className="contact-box">
            <NavLink
              to="https://www.google.com/maps/place/Widesoftech+PVT.+LTD./@21.1307426,79.0974536,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd4bff0f6025935:0x8b80daeacfbe1f64!8m2!3d21.1307376!4d79.1000285!16s%2Fg%2F11ryh08v9_?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
              className="contact-link"
            >
              <FaLocationPin />
          
            <span>Nagpur</span>
              </NavLink>
          </div>

          <div className="contact-box">
            <NavLink
              to="tel:+91 9307370023"
              className="contact-link"
            >
              <FaPhone />
            
            <span>+91 9307370023</span>
            </NavLink>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;
