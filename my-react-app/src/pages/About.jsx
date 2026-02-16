import React, { useEffect } from "react";
import "../styles/About.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import founder from "../assets/founder.png"   

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
            
            <h2>TechAlpha</h2>
          <p>
           TechAlpha is a next-generation platform dedicated to launching impactful hackathons, tech events, and hands-on workshops for students, developers, designers, and innovators.
          </p>

          <p>
           We believe innovation grows when ideas meet opportunity. TechAlpha brings together passionate minds, industry mentors, and real-world problem statements to create an ecosystem where learning turns into action.
          </p>

          <p>
            Sponsored by Widesoftech, TechAlpha ensures industry-level exposure, mentorship, and opportunities for participants to grow beyond the classroom and build solutions that matter.
          </p>

        </div>



  <div className="about-card floating-card reveal">
            
            <h2>Our Mission</h2>
          <p>
           Our mission is to empower students and developers by providing platforms where they can:
          </p>

         <ul>
          <li>Solve real-world problems</li>
          <li>Collaborate with like-minded innovators</li>
          <li>Learn modern technologies</li>
          <li>Build industry-ready skills</li>
         </ul>

        </div>


           <div className="about-card floating-card reveal">
            
            <h2>Our Vision</h2>
          <p>
          To become a leading community for innovation and technology, connecting talented individuals with opportunities, mentors, and organizations across the country.
          </p>

        

        </div>

     <div className="about-card floating-card reveal">
            
            <h2>organizer</h2>
             <img
            src={founder}
            alt="founder image"
            className="sponsor-logo"
          />

            <h5>  Rajeev Tiwari </h5>
          <p>
        Founder of TechAlpha, focused on building a strong ecosystem where students and developers can explore technology, innovation, and entrepreneurship through hackathons and technical events.
          </p>

      

        </div>


         <div className="about-card floating-card reveal">
            
            <h2>What We Do</h2>
            
          <p>
          TechAlpha organizes:
          </p>

         <ul>
          <li>Hackathons</li>
          <li>Technical Workshops</li>
          <li>Coding Challenges</li>
          <li>Industry Interaction Sessions</li>
          <li>Innovation Events</li>
         </ul>
           <p>These initiatives help participants gain practical experience, teamwork skills, and exposure to real industry workflows.</p>
        </div>


        <div className="about-card floating-card reveal">
            
            <h2>Our Values</h2>
            
        
         <ul>
          <li>Innovation First</li>
          <li>Real-World Impact</li>
          <li>Learning by Doing</li>
          <li>Collaboration & Community</li>
         
          </ul>
        </div>










      </section>

    </div>
              
     


  );
}

export default About;
