import React, { useEffect } from "react";
import Header from "../components/Header";
import RightSideMenu from "../components/RightSideMenu";
import SideMenu from "../components/SideMenu";
import agoda from "../assets/agoda.png";
import building from "../assets/building.png";
import "../styles/Accommodation.css";

const Accommodation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const glow = document.querySelector(".mouse-glow");

    const moveGlow = event => {
      if (!glow) {
        return;
      }

      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    };

    window.addEventListener("mousemove", moveGlow);

    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  return (
    <div>
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="mouse-glow"></div>

      <div className="cyber-lines">
        <span style={{ left: "10%" }}></span>
        <span style={{ left: "30%", animationDelay: "2s" }}></span>
        <span style={{ left: "60%", animationDelay: "4s" }}></span>
        <span style={{ left: "80%", animationDelay: "1s" }}></span>
      </div>

      <div className="accommodation-page">
        <section className="acc-hero reveal">
          <div className="acc-hero-panel">
            <div className="acc-hero-copy glass-surface">
              <p className="acc-kicker">Stay Close To The Action</p>
              <h1 className="glitch" data-text="ACCOMMODATION">
                ACCOMMODATION
              </h1>
              <p className="acc-subtitle">
                Comfortable stay options, smooth check-in, and quick access to
                the TechAlpha venue for your full team.
              </p>
            </div>
            <div className="acc-hero-visual glass-surface">
              <img src={building} alt="Accommodation building preview" />
            </div>
          </div>
        </section>

        <div className="neon-divider"></div>

        <section className="about-acc-section reveal">
          <h2 className="about-heading">ABOUT ACCOMMODATION</h2>

          <div className="about-container">
            <div className="about-card glass-surface">
              <h3>BOOK YOUR HOTEL</h3>

              <div className="logo-box">
                <img src={agoda} alt="Agoda" />
              </div>

              <p className="partner-text">OFFICIAL HOSPITALITY PARTNER</p>
              <p className="coupon-text">
                USE FOLLOWING COUPON CODES TO GET A DISCOUNT:
                <br />
                TECHFEST - FOR OVERNIGHT STAY
                <br />
                TECHVIBES - FOR HOURLY STAY
              </p>
            </div>

            <div className="arrow-area" aria-hidden="true">
              <span>HOTEL</span>
              <span>OR</span>
              <span>CAMPUS</span>
            </div>

            <div className="about-card glass-surface">
              <h3>ACCOMMODATION BY TECHALPHA</h3>

              <p className="desc">
                Due to overwhelming demand, accommodation may be arranged
                either on campus or at an official partner hotel depending on
                availability. We will try to house your group together.
              </p>

              <p className="desc small">
                Fill this form to get notified when seats open:
              </p>

              <a
                href="https://forms.gle/gPJtMv1X7oNYAbsq6"
                target="_blank"
                rel="noreferrer"
              >
                <button className="interest-btn">FILL INTEREST</button>
              </a>
            </div>
          </div>
        </section>

        <div className="neon-divider"></div>

        <section className="acc-section reveal">
          <h2 className="section-title">GENERAL DETAILS</h2>

          <div className="details-grid">
            <div className="detail-card glass-surface">
              <h3>CHARGES</h3>
              <p>Rs. 3500 / Day / Per person</p>
            </div>

            <div className="detail-card glass-surface">
              <h3>LOCATION</h3>
              <p>Near TechAlpha Venue</p>
            </div>

            <div className="detail-card glass-surface">
              <h3>DURATION</h3>
              <p>21 FEB - 24 FEB, 2026</p>
            </div>
          </div>
        </section>

        <div className="neon-divider"></div>

        <section className="acc-section reveal">
          <div className="event-card glass-surface">
            <p className="acc-kicker">Official Stay Window</p>
            <h2>TECHALPHA 2026</h2>
            <p>Hackathon and Software Fest</p>

            <a
              href="https://forms.gle/gPJtMv1X7oNYAbsq6"
              target="_blank"
              rel="noreferrer"
            >
              <button className="glow-btn">BOOK NOW</button>
            </a>
          </div>
        </section>

        <div className="neon-divider"></div>

        <section className="acc-section reveal">
          <h2 className="section-title">PERKS AND BENEFITS</h2>

          <div className="perks-grid">
            <div className="perk glass-surface">BUDGET FRIENDLY</div>
            <div className="perk glass-surface">CONVENIENT STAY</div>
          </div>
        </section>

        <div className="neon-divider"></div>

        <section className="acc-section reveal">
          <h2 className="section-title">FAQ</h2>

          <details className="faq glass-surface">
            <summary>How do I register?</summary>
            <p>Fill the interest form and our team will contact you.</p>
          </details>

          <details className="faq glass-surface">
            <summary>Is food included?</summary>
            <p>No, but nearby partner restaurants are available.</p>
          </details>
        </section>
      </div>
    </div>
  );
};

export default Accommodation;
