import React, { useEffect } from "react";
import "../styles/Hackathon.css";

import heroImg from "../assets/hero1.png";
import sponsorLogo from "../assets/logo.png";
import hackImg from "../assets/techalpha2.png";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

import qrImg from "../assets/qr.jpeg";
import collablogo from "../assets/image.png";

import { NavLink, useNavigate } from "react-router-dom";

import Timeline from "../components/Timeline";
import Countdown from "../components/Countdown";
import Prizes from "../components/Prizes";

function Hackathon() {

  const navigate = useNavigate();

  const registrationClosed = true; // change to false to open registration

  // check login before register
  const handleRegister = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to register");
      navigate("/login");
      return;
    }

    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdYId8H8SnU6iYrb-lqgsMiBMCT956ENM51LU2GTN54XW8lNw/viewform",
      "_blank"
    );
  };

  useEffect(() => {

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
    <div className="app-container">

      <Header />
      <SideMenu />
      <RightSideMenu />

      {/* HERO SECTION */}
      <div
        className="hero-section reveal"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay">

          <h1 className="hero-title">
            TECHALPHA HACKATHON 2026
          </h1>

          <p className="hero-subtitle">
            From Innovation To Execution 🚀
            <Countdown />
          </p>

        </div>
      </div>

      {/* ABOUT */}
      <section className="section">

        <div className="section-title reveal">
          ABOUT US
        </div>

        <div className="glass-card floating-card reveal">

          <p>
            TechAlpha is a next-generation platform dedicated to launching impactful
            hackathons, tech events, and hands-on workshops.
          </p>

          <p>
            We believe innovation grows when ideas meet opportunity. From coding
            marathons to startup challenges, TechAlpha builds future leaders.
          </p>

          <p>
            Sponsored by Widesoftech, TechAlpha ensures industry exposure and mentorship.
          </p>

        </div>

      </section>

      <Prizes />

      {/* CONTACT */}
      <section className="section">

        <div className="section-title reveal">
          CONTACT US
        </div>

        <div className="hackathon-contact-grid reveal">

          <div className="hackathon-contact-card floating-card">
            <h4>Email</h4>
            <p>hr@widesoftech.com</p>
          </div>

          <div className="hackathon-contact-card floating-card">
            <h4>Location</h4>
            <p>Nagpur</p>
          </div>

          <div className="hackathon-contact-card floating-card">
            <h4>Phone</h4>
            <p>+91 9307370023</p>
          </div>

        </div>

      </section>

      {/* VENUE */}
      <section className="section">

        <div className="section-title reveal">
          Venue
        </div>

        <div className="hackathon-contact-grid reveal">

          <div className="hackathon-contact-card floating-card">

            <NavLink
              to="https://www.bing.com/maps/search?mepi=0%7E%7EEmbedded%7EAddress_Link&ty=18&v=2&sV=1&FORM=MPSRPL&q=Priyadarshini+Institute+of+Engineering+%26+Technology"
              className="contact-link"
            >
              <span>
                Priyadarshini College of Engineering, Hingna Rd, Nagpur
              </span>
            </NavLink>

          </div>

        </div>

      </section>

      <div className="section-title reveal">
        TIME LINE
      </div>

      <Timeline />

      {/* SPONSORS */}
      <section className="section">

        <div className="section-title reveal">
          SPONSORS
        </div>

        <div className="img-div reveal">
          <img src={sponsorLogo} alt="Sponsor" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">

          <h2>Widesoftech Pvt. Ltd.</h2>

          <p>
            Widesoftech Pvt. Ltd. is a Nagpur-based technology company focused
            on digital solutions, software development, and professional training.
          </p>

          <p>
            Founded in 2022, the company provides IT services, training,
            and industry-focused learning experiences.
          </p>

          <p>
            As a sponsor of this hackathon, Widesoftech encourages innovation
            and real-world problem solving.
          </p>

        </div>

      </section>

      {/* COLLABORATION */}
      <section className="section">

        <div className="section-title reveal">
          collaboration
        </div>

        <div className="img-div reveal">
          <img src={collablogo} alt="Sponsor" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">

          <h2>Department of Industrial IoT</h2>

          <h3>
            Priyadarshini College of Engineering, Nagpur
          </h3>

          <p>
            The IIoT department focuses on smart technologies,
            automation, and connected systems aligned with Industry 4.0.
          </p>

        </div>

      </section>

      {/* HACKATHON DETAILS */}
      <section className="section">

        <div className="section-title reveal">
          HACKATHON
        </div>

        <div className="img-div reveal">
          <img src={hackImg} alt="Hackathon" className="card-img1" />
        </div>

        <div className="glass-card hack-card floating-card reveal">

          <h3>TechAlpha Hackathon</h3>

          <h4>What To Expect</h4>

          <ul>
            <li>24 hours innovation</li>
            <li>Real-world problems</li>
            <li>Industry mentorship</li>
            <li>Team networking</li>
            <li>Exciting prizes</li>
          </ul>

        </div>

      </section>

      {/* REGISTRATION */}
      <section className="section">

        <div className="section-title reveal">
          REGISTRATION
        </div>

        {registrationClosed ? (

          <div className="qr-container glass-card floating-card reveal">

            <h2 style={{ color: "red" }}>
              Registration Closed
            </h2>

            <p>
              Registration for TechAlpha Hackathon 2026 is now closed.
            </p>

          </div>

        ) : (

          <div
            className="qr-container glass-card floating-card reveal"
            onClick={handleRegister}
          >

            <img src={qrImg} alt="Scan QR" className="qr-img" />

            <div className="qr-text">

              <h3>Scan & Register</h3>

              <p>
                Scan this QR code or click it to register.
              </p>

            </div>

          </div>

        )}

      </section>

      {/* FOOTER */}
      <footer>

        <div className="section-footer">

          <div>
            Mr. Parag <br />
            +91 9307370023 <br />
            hr@widesoftech.com
          </div>

          <div>
            Miss Madhu <br />
            +91 9373306416 <br />
            widesoftech@gmail.com
          </div>

          <div>
            Mr. Rajeev <br />
            +91 8830079798 <br />
            hr@widesoftech.com
          </div>

        </div>

        <p>© 2026 TechAlpha Hackathon</p>

      </footer>

    </div>
  );
}

export default Hackathon;