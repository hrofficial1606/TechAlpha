import React, { useEffect } from "react";
import "../styles/Hackathon.css";

import heroImg from "../assets/hero1.png";
import sponsorLogo from "../assets/logo.png";
import hackImg from "../assets/techalpha2.png";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import qrImg from "../assets/qr.jpeg";
import collablogo from "../assets/collablogo.png"   
import { NavLink } from "react-router-dom";

import { FaMailBulk } from "react-icons/fa";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import Timeline from "../components/Timeline";
import Countdown from "../components/Countdown";
import Prizes from "../components/Prizes";
function Hackathon() {
     
    

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
    <div className="app-container">

      <Header />
      <SideMenu />
      <RightSideMenu />

     {/* HERO SECTION WITH BACKGROUND IMAGE */}
<div
  className="hero-section reveal"
  style={{ backgroundImage: `url(${heroImg})` }}
>
  <div className="hero-overlay">
    <h1 className="hero-title">TECHALPHA HACKATHON 2026</h1>
    <p className="hero-subtitle">
      From Innovation To Execution 🚀
        <Countdown/>
    </p>
  </div>

</div>

      
      {/* ABOUT */}
      <section className="section">

        <div className="section-title reveal">ABOUT US</div>

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
           <Prizes/>

      {/* CONTACT */}
      <section className="section">

        <div className="section-title reveal">CONTACT US</div>

        <div className="hackathon-contact-grid reveal">

          <div className="hackathon-contact-card floating-card">
            <h4>Email</h4>
            <p> hr@widesoftech.com</p>
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
           
          {/* CONTACT */}
      <section className="section">

        <div className="section-title reveal">Venue</div>

        <div className="hackathon-contact-grid reveal">

          <div className="hackathon-contact-card floating-card">
            <NavLink
                         to="https://www.bing.com/maps/search?mepi=0%7E%7EEmbedded%7EAddress_Link&ty=18&v=2&sV=1&FORM=MPSRPL&q=Priyadarshini+Institute+of+Engineering+%26+Technology&ss=id.ypid%3AYN4070x252349062&ppois=21.101604461669922_79.0083999633789_Priyadarshini+Institute+of+Engineering+%26+Technology_YN4070x252349062%7E&cp=21.101604%7E79.008400&lvl=11&style=r"
                         className="contact-link"
                       >
                         <FaLocationPin />
                     
                       <span>Priyadarshini College of Engineering,hingna rd, Nagpur, 440019 </span>
                         </NavLink>
          </div>

      

        </div>

      </section>
           <div className="section-title reveal">tIME LINE</div>
    <Timeline/>

      {/* SPONSORS */}
      <section className="section">

        <div className="section-title reveal">SPONSORS</div>

        <div className="img-div reveal">
          <img src={sponsorLogo} alt="Sponsor" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">
          <p>
            Widesoftech is a leading technology company empowering innovation and talent.
          </p>

          <p>
            Together, TechAlpha and Widesoftech bridge the gap between learning and industry.
          </p>

          <p>
            Interested in sponsoring? Contact us today.
          </p>
        </div>

      </section>
               {/* Colabration  */}
       
        <section className="section">

        <div className="section-title reveal">collaboration</div>

        <div className="img-div reveal">
          <img src={collablogo} alt="Sponsor" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">
          <p>
          Priyadarshini College of Engineering, Nagpur is a premier institution dedicated to academic excellence, innovation, and holistic student development.
          </p>

          <p>
            Through industry-focused education and practical learning, the college prepares students to meet real-world technological challenges.
          </p>

          
        </div>

      </section>








      {/* HACKATHON */}
      <section className="section">

        <div className="section-title reveal">HACKATHON</div>

        <div className="img-div reveal">
          <img src={hackImg} alt="Hackathon" className="card-img1" />
        </div>

        <div className="glass-card hack-card floating-card reveal">

          <h3>TechAlpha Hackathon</h3>

          <p>
            The TechAlpha Hackathon is a high-energy innovation challenge.
          </p>

          <h4>What To Expect</h4>

          <ul>
            <li>24 hours innovation</li>
            <li>Real-world problems</li>
            <li>Industry mentorship</li>
            <li>Team networking</li>
            <li>Exciting prizes</li>
          </ul>

          <h4>Who Can Participate</h4>

          <ul>
            <li>Students</li>
            <li>Developers</li>
            <li>Designers</li>
            <li>Tech Enthusiasts</li>
          </ul>

        </div>

      </section>


      {/* SCAN TO REGISTER */}
<section className="section">

  <div className="section-title reveal">SCAN TO REGISTER</div>

  <div className="qr-container glass-card floating-card reveal">
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYId8H8SnU6iYrb-lqgsMiBMCT956ENM51LU2GTN54XW8lNw/viewform" target="_blank">
    <img src={qrImg} alt="Scan QR" className="qr-img" />
   </a>
    <div className="qr-text">
      <h3>Scan & Register</h3>
      <p>
        Scan this QR code or Click on QR code to instantly register for
        TechAlpha Hackathon 2026.
      </p>

      <p className="qr-note">
        Limited seats available 🚀
      </p>
       
    </div>
         
  </div>
        <Countdown/>
</section>


      {/* FOOTER */}
      <footer>

        <div className="section-footer">

          <div>
             Mr. Parag <br />
            <a >+91 9307370023</a> <br />
            <a > hr@widesoftech.com</a>
          </div>

          <div>
                Miss Madhu <br />
            <a >+91 9373306416</a> <br />
            <a > widesoftech@gmail.com</a>
          </div>

         
          <div>
             Mr. Rajeev <br />
            <a >+91 8830079798</a> <br />
            <a > hr@widesoftech.com</a>
          </div>

        </div>

        <p>© 2026 TechAlpha Hackathon</p>

      </footer>

    </div>
  );
}

export default Hackathon;
