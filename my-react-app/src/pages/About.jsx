import React, { useEffect } from "react";
import "../styles/About.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

function About() {

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
    <div className="about-page">

      <Header />
      <SideMenu />
      <RightSideMenu />

      <section className="about-section">

        {/* GLASS CARD */}
        <div className="about-card floating-card reveal">

          <p>
            TechAlpha is a next-generation platform dedicated to launching
            impactful hackathons, tech events, and hands-on workshops for
            students, developers, designers, and innovators.
          </p>

          <p>
            We believe innovation grows when ideas meet opportunity. TechAlpha
            brings together passionate minds, industry mentors, and real-world
            problem statements to create an ecosystem where learning turns into
            action.
          </p>

          <p>
            Sponsored by Widesoftech, TechAlpha ensures industry-level exposure,
            mentorship, and opportunities for participants to grow beyond the
            classroom.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;
