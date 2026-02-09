import Header from "../components/Header";
import RightSideMenu from "../components/RightSideMenu";
import SideMenu from "../components/SideMenu";
import "../styles/Accommodation.css";
import React, { useEffect } from "react";
import agoda from "../assets/agoda.png";
import building from "../assets/building.png";

const Accommodation = () => {

  /* Scroll reveal animation */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }, []);

  /* Mouse glow */
  useEffect(() => {
    const glow = document.querySelector(".mouse-glow");

    const moveGlow = (e) => {
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  return (
    <div>
      <Header/>
      <SideMenu/>
      <RightSideMenu/>

      {/* Effects */}
      <div className="mouse-glow"></div>

      <div className="cyber-lines">
        <span style={{left:"10%"}}></span>
        <span style={{left:"30%", animationDelay:"2s"}}></span>
        <span style={{left:"60%", animationDelay:"4s"}}></span>
        <span style={{left:"80%", animationDelay:"1s"}}></span>
      </div>
      {/* Mobile Banner */}
<div className="acc-mobile-banner">
  <img src={building} alt="Accommodation Banner" />
</div>


      <div className="accommodation-page">

        {/* HERO */}
        <section className="acc-hero">
      
        </section>

        {/* ABOUT */}
        <section className="about-acc-section reveal">

          <h2 className="about-heading">ABOUT ACCOMMODATION</h2>

          <div className="about-container">

            <div className="about-card left">
              <h3>BOOK YOUR HOTEL</h3>

              <div className="logo-box">
                <img src={agoda} alt="Agoda" />
              </div>

              <p className="partner-text">OFFICIAL HOSPITALITY PARTNER</p>
              <p className="coupon-text">
                USE FOLLOWING COUPON CODES TO GET A DISCOUNT:<br/>
                TECHFEST – FOR OVERNIGHT STAY<br/>
                TECHVIBES – FOR HOURLY STAY
              </p>
            </div>

            <div className="arrow-area">
              <span>&lt;&lt;&lt;</span>
              <span>&gt;&gt;&gt;</span>
            </div>

            <div className="about-card right">
              <h3>ACCOMMODATION BY TECHFEST</h3>

              <p className="desc">
                Note: Due to overwhelming demand, accommodation may be arranged 
                either on campus or at an official partner hotel depending on 
                availability. Rest assured, we will do our best to house your 
                group members together.
              </p>

              <p className="desc small">
                Fill this form to get notified as soon as more seats are made available:
              </p>

              <button className="interest-btn">FILL INTEREST</button>
            </div>

          </div>
        </section>

        {/* GENERAL DETAILS */}
        <section className="acc-section reveal">
          <h2 className="section-title">GENERAL DETAILS</h2>

          <div className="details-grid">
            <div className="detail-card">
              <h3>CHARGES</h3>
              <p>₹3500 / Day / PER person</p>
            </div>

            <div className="detail-card">
              <h3>LOCATION</h3>
              <p>Near TechAlpha Venue</p>
            </div>

            <div className="detail-card">
              <h3>DURATION</h3>
              <p>21 FEB – 24 FEB, 2026</p>
            </div>
          </div>
        </section>

        {/* EVENT */}
        <section className="acc-section reveal">
          <div className="event-card">
            <h2>TECHALPHA 2026</h2>
            <p>Hackathon & Software Fest</p>
            <button className="glow-btn">BOOK NOW</button>
          </div>
        </section>

        {/* PERKS */}
        <section className="acc-section reveal">
          <h2 className="section-title">PERKS & BENEFITS</h2>

          <div className="perks-grid">
            <div className="perk">BUDGET FRIENDLY</div>
            <div className="perk">CONVENIENT STAY</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="acc-section reveal">
          <h2 className="section-title">FAQ</h2>

          <details className="faq">
            <summary>How do I register?</summary>
            <p>Fill the interest form and our team will contact you.</p>
          </details>

          <details className="faq">
            <summary>Is food included?</summary>
            <p>NO Food is not available but nearby partner restaurants are there.</p>
          </details>
        </section>

      </div>
    </div>
  );
};

export default Accommodation;
