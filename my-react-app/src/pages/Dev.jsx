import React, { useEffect } from "react";
import "../styles/Dev.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

function Dev() {

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
    <div className="dev-page">

      <Header />
      <SideMenu />
      <RightSideMenu />

      <section className="dev-section">

        <div className="dev-card floating-card reveal">

          <h1 className="dev-title">🚧 Coming Soon</h1>

          <p>
            This page is currently under development.
          </p>

          <p>
            Our team is working hard to bring exciting new features and
            experiences for TechAlpha users.
          </p>

          <p className="dev-highlight">
            Stay tuned for updates 🚀
          </p>

        </div>

      </section>

    </div>
  );
}

export default Dev;
