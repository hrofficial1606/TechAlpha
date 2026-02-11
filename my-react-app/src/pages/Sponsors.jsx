import React, { useEffect } from "react";
import "../styles/Sponsors.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import collablogo from "../assets/collabcollege.png"   

function Sponsors() {

  useEffect(() => {

    // ===== SCROLL REVEAL =====
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

    // ===== PARALLAX EFFECT =====
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const section = document.querySelector(".sponsors-section");

      if (section) {
        section.style.backgroundPositionY = scrolled * 0.3 + "px";
      }
    };

    window.addEventListener("scroll", handleParallax);

    return () => {
      window.removeEventListener("scroll", scrollReveal);
      window.removeEventListener("scroll", handleParallax);
    };

  }, []);

  return (
    <div className="sponsors-page">

      <Header />
      <SideMenu />
      <RightSideMenu />

      <section className="sponsors-section">

        {/* GLASS CARD */}
        <div className="sponsors-card floating-card reveal">

          <img
            src="/Image/logo.png"
            alt="Sponsor Logo"
            className="sponsor-logo"
          />

          <p>
            Widesoftech is a leading technology company committed to empowering
            innovation, digital skills, and future-ready talent. By sponsoring
            TechAlpha, Widesoftech supports young innovators in gaining real-world
            experience through hackathons and workshops.
          </p>

          <p>
            💡 Together, TechAlpha and Widesoftech aim to bridge the gap between
            learning and industry. We welcome brands, startups, and organizations
            to partner with us and be part of our innovation journey.
          </p>

          <p>
            📩 Interested in sponsoring? Contact us today.
          </p>

        </div>
            
            <div className="sponsors-card floating-card reveal">

          <img
            src={collablogo}
            alt="Sponsor Logo"
            className="sponsor-logo"
          />

          <p>
           Priyadarshini College of Engineering, Nagpur is a premier institution dedicated to academic excellence, innovation, and holistic student development.
          </p>

          <p>
           Through industry-focused education and practical learning, the college prepares students to meet real-world technological challenges.
          </p>

          

        </div>
      </section>

    </div>
  );
}

export default Sponsors;
