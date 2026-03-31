import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import Timeline from "../components/Timeline";
import Countdown from "../components/Countdown";
import Prizes from "../components/Prizes";
import heroImg from "../assets/hero1.png";
import sponsorLogo from "../assets/logo.png";
import hackImg from "../assets/techalpha2.png";
import qrImg from "../assets/qr.jpeg";
import collablogo from "../assets/image.png";
import { getHackathonContent } from "../services/eventService";
import "../styles/Hackathon.css";

const defaultContent = {
  heroTitle: "TECHALPHA HACKATHON 2026",
  heroSubtitle: "From Innovation To Execution",
  aboutTitle: "ABOUT US",
  aboutParagraphs: [
    "TechAlpha is a next-generation platform dedicated to launching impactful hackathons, tech events, and hands-on workshops.",
    "We believe innovation grows when ideas meet opportunity. From coding marathons to startup challenges, TechAlpha builds future leaders.",
    "Sponsored by Widesoftech, TechAlpha ensures industry exposure and mentorship.",
  ],
  prizesTitle: "Prizes",
  prizesSubtitle: "Exciting rewards and swags await the most innovative minds",
  prizesTotal: "Rs. 30,000+",
  prizeCards: [
    { title: "Winner", amount: "Rs. 21,000", emoji: "Trophy", tba: "Free Internship", border: "gold" },
    { title: "Runner Up", amount: "Rs. 11,000", emoji: "Medal", tba: "", border: "silver" },
  ],
  contactTitle: "CONTACT US",
  contactItems: [
    { label: "Email", value: "hr@widesoftech.com" },
    { label: "Location", value: "Nagpur" },
    { label: "Phone", value: "+91 9307370023" },
  ],
  venueTitle: "Venue",
  venueName: "Priyadarshini College of Engineering, Hingna Rd, Nagpur",
  venueLink:
    "https://www.bing.com/maps/search?mepi=0~~Embedded~Address_Link&ty=18&v=2&sV=1&FORM=MPSRPL&q=Priyadarshini+Institute+of+Engineering+%26+Technology",
  timelineTitle: "TIME LINE",
  day1Label: "Day 1",
  day2Label: "Day 2",
  day1Events: [],
  day2Events: [],
  sponsorsTitle: "SPONSORS",
  sponsorImageUrl: sponsorLogo,
  sponsorName: "Widesoftech Pvt. Ltd.",
  sponsorParagraphs: [
    "Widesoftech Pvt. Ltd. is a Nagpur-based technology company focused on digital solutions, software development, and professional training.",
    "Founded in 2022, the company provides IT services, training, and industry-focused learning experiences.",
    "As a sponsor of this hackathon, Widesoftech encourages innovation and real-world problem solving.",
  ],
  collaborationTitle: "collaboration",
  collaborationImageUrl: collablogo,
  collaborationName: "Department of Industrial IoT",
  collaborationSubtitle: "Priyadarshini College of Engineering, Nagpur",
  collaborationParagraphs: [
    "The IIoT department focuses on smart technologies, automation, and connected systems aligned with Industry 4.0.",
  ],
  hackathonSectionTitle: "HACKATHON",
  hackathonImageUrl: hackImg,
  hackathonCardTitle: "TechAlpha Hackathon",
  hackathonCardSubtitle: "What To Expect",
  hackathonHighlights: [
    "24 hours innovation",
    "Real-world problems",
    "Industry mentorship",
    "Team networking",
    "Exciting prizes",
  ],
};

function mergeHackathonContent(defaults, remoteContent) {
  if (!remoteContent) {
    return defaults;
  }

  return {
    ...defaults,
    ...remoteContent,
    aboutParagraphs: remoteContent.aboutParagraphs?.length ? remoteContent.aboutParagraphs : defaults.aboutParagraphs,
    prizeCards: remoteContent.prizeCards?.length ? remoteContent.prizeCards : defaults.prizeCards,
    contactItems: remoteContent.contactItems?.length ? remoteContent.contactItems : defaults.contactItems,
    sponsorParagraphs: remoteContent.sponsorParagraphs?.length ? remoteContent.sponsorParagraphs : defaults.sponsorParagraphs,
    collaborationParagraphs: remoteContent.collaborationParagraphs?.length
      ? remoteContent.collaborationParagraphs
      : defaults.collaborationParagraphs,
    hackathonHighlights: remoteContent.hackathonHighlights?.length
      ? remoteContent.hackathonHighlights
      : defaults.hackathonHighlights,
    day1Events: remoteContent.day1Events?.length ? remoteContent.day1Events : defaults.day1Events,
    day2Events: remoteContent.day2Events?.length ? remoteContent.day2Events : defaults.day2Events,
  };
}

function Hackathon() {
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultContent);
  const registrationClosed = true;

  useEffect(() => {
    const loadContent = async () => {
      try {
        const remoteContent = await getHackathonContent();
        setContent(mergeHackathonContent(defaultContent, remoteContent));
      } catch (error) {
        setContent(defaultContent);
      }
    };

    loadContent();
  }, []);

  const mergedContent = useMemo(() => mergeHackathonContent(defaultContent, content), [content]);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const scrollReveal = () => {
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", scrollReveal);
    scrollReveal();

    return () => window.removeEventListener("scroll", scrollReveal);
  }, [mergedContent]);

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

  return (
    <div className="app-container">
      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="hero-section reveal" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">{mergedContent.heroTitle}</h1>
          <p className="hero-subtitle">
            {mergedContent.heroSubtitle}
            <Countdown />
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-title reveal">{mergedContent.aboutTitle}</div>
        <div className="glass-card floating-card reveal">
          {mergedContent.aboutParagraphs.map((paragraph, index) => (
            <p key={`about-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Prizes
        title={mergedContent.prizesTitle}
        subtitle={mergedContent.prizesSubtitle}
        totalPrize={mergedContent.prizesTotal}
        prizeCards={mergedContent.prizeCards}
      />

      <section className="section">
        <div className="section-title reveal">{mergedContent.contactTitle}</div>

        <div className="hackathon-contact-grid reveal">
          {mergedContent.contactItems.map((item, index) => (
            <div className="hackathon-contact-card floating-card" key={`${item.label}-${index}`}>
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title reveal">{mergedContent.venueTitle}</div>

        <div className="hackathon-contact-grid reveal">
          <div className="hackathon-contact-card floating-card">
            <NavLink to={mergedContent.venueLink} className="contact-link" target="_blank" rel="noreferrer">
              <span>{mergedContent.venueName}</span>
            </NavLink>
          </div>
        </div>
      </section>

      <div className="section-title reveal">{mergedContent.timelineTitle}</div>

      <Timeline
        day1Label={mergedContent.day1Label}
        day2Label={mergedContent.day2Label}
        day1Events={mergedContent.day1Events}
        day2Events={mergedContent.day2Events}
      />

      <section className="section">
        <div className="section-title reveal">{mergedContent.sponsorsTitle}</div>

        <div className="img-div reveal">
          <img src={mergedContent.sponsorImageUrl || sponsorLogo} alt="Sponsor" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">
          <h2>{mergedContent.sponsorName}</h2>

          {mergedContent.sponsorParagraphs.map((paragraph, index) => (
            <p key={`sponsor-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title reveal">{mergedContent.collaborationTitle}</div>

        <div className="img-div reveal">
          <img src={mergedContent.collaborationImageUrl || collablogo} alt="Collaboration" className="card-img" />
        </div>

        <div className="glass-card floating-card reveal">
          <h2>{mergedContent.collaborationName}</h2>
          <h3>{mergedContent.collaborationSubtitle}</h3>

          {mergedContent.collaborationParagraphs.map((paragraph, index) => (
            <p key={`collab-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title reveal">{mergedContent.hackathonSectionTitle}</div>

        <div className="img-div reveal">
          <img src={mergedContent.hackathonImageUrl || hackImg} alt="Hackathon" className="card-img1" />
        </div>

        <div className="glass-card hack-card floating-card reveal">
          <h3>{mergedContent.hackathonCardTitle}</h3>
          <h4>{mergedContent.hackathonCardSubtitle}</h4>

          <ul>
            {mergedContent.hackathonHighlights.map((highlight, index) => (
              <li key={`highlight-${index}`}>{highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-title reveal">REGISTRATION</div>

        {registrationClosed ? (
          <div className="qr-container glass-card floating-card reveal">
            <h2 style={{ color: "red" }}>Registration Closed</h2>
            <p>Registration for TechAlpha Hackathon 2026 is now closed.</p>
          </div>
        ) : (
          <div className="qr-container glass-card floating-card reveal" onClick={handleRegister}>
            <img src={qrImg} alt="Scan QR" className="qr-img" />

            <div className="qr-text">
              <h3>Scan and Register</h3>
              <p>Scan this QR code or click it to register.</p>
            </div>
          </div>
        )}
      </section>

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

        <p>&copy; 2026 TechAlpha Hackathon</p>
      </footer>
    </div>
  );
}

export default Hackathon;
