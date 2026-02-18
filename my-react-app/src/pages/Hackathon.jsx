import React, { useEffect } from "react";
import "../styles/Hackathon.css";

import heroImg from "../assets/hero1.png";
import sponsorLogo from "../assets/logo.png";
import hackImg from "../assets/techalpha2.png";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import qrImg from "../assets/qr.jpeg";
import collablogo from "../assets/image.png"   
import { NavLink } from "react-router-dom";

import { FaMailBulk } from "react-icons/fa";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import Timeline from "../components/Timeline";
import Countdown from "../components/Countdown";
import Prizes from "../components/Prizes";
function Hackathon() {
     
    const registrationClosed = true;   // change to false to open registration


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

          <h2>Widesoftech Pvt. Ltd.</h2>
          <p>
          Widesoftech Pvt. Ltd. is a Nagpur-based technology and software services company focused on delivering innovative digital solutions, IT services, and professional training. The company works in areas such as software development, UI/UX, web technologies, and consulting, helping businesses and students build practical, industry-ready skills and solutions.
          </p>

          <p>
           Founded in 2022, Widesoftech Pvt. Ltd. operates as a private limited company headquartered in Nagpur, Maharashtra, and provides services across multiple domains including IT services, education and training, and digital technologies.
          </p>

          <p>
           The organization is also known for offering hands-on training, internships, and real-world project exposure, helping students bridge the gap between academic learning and industry requirements.
          </p>
          <p>
            As a sponsor of this hackathon, Widesoftech Pvt. Ltd. supports innovation, technical learning, and real-world problem solving. Their contribution encourages participants to apply their knowledge, collaborate, and develop impactful technology solutions.
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
           <h2>Department of Industrial IoT</h2>
           <h3>Priyadarshini College of Engineering, Nagpur</h3>
          <p>
          The Department of Industrial Internet of Things (IIoT), Priyadarshini College of Engineering, Nagpur is dedicated to advancing innovation in smart technologies, automation, and connected systems. The department focuses on equipping students with practical skills in IoT, embedded systems, cloud integration, and industrial automation to meet the evolving demands of Industry 4.0.
           </p>

          <p>
           Priyadarshini College of Engineering is approved by A.I.C.T.E., New Delhi and the Government of Maharashtra, and is affiliated with Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur. The institution is known for promoting technical excellence, research, and industry collaboration.
           </p>

           <p>
            As a collaborating academic partner for this hackathon, the Department of Industrial IoT actively supports innovation, encourages problem-solving, and provides a platform for students and developers to showcase their creativity and technical skills in real-world challenges.

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

  <div className="section-title reveal">REGISTRATION</div>

  {registrationClosed ? (
    <div className="qr-container glass-card floating-card reveal">
      <h2 style={{ color: "red" }}>Registration Closed</h2>
      <p>
        Thank you for your interest. Registration for TechAlpha Hackathon 2026
        is now closed.
      </p>
      <p>Stay tuned for future events 🚀</p>
    </div>
  ) : (
    <div className="qr-container glass-card floating-card reveal">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdYId8H8SnU6iYrb-lqgsMiBMCT956ENM51LU2GTN54XW8lNw/viewform"
        target="_blank"
        rel="noreferrer"
      >
        <img src={qrImg} alt="Scan QR" className="qr-img" />
      </a>

      <div className="qr-text">
        <h3>Scan & Register</h3>
        <p>
          Scan this QR code or click it to instantly register for
          TechAlpha Hackathon 2026.
        </p>
        <p className="qr-note">Limited seats available 🚀</p>
      </div>
    </div>
  )}

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
