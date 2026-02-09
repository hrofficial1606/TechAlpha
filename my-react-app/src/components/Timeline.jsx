import "../styles/timeline.css";
import React, { useEffect, useRef } from "react";

const events = [
  {
    time: "8:00 AM to 10:00 AM",
    title: "Registration & Inauguration",
    points: ["Participant registration and ID verification Inauguration ceremony with guests and faculty Overview of HackWhack 3.0 objectives and theme"]
  },
  {
    time: "10:15 AM – 11:15 AM",
    title: "Breakfast",
    points: ["Breakfast provided to all participants", "Setup time for PPT presentations"]
  },
  {
    time: "11:30 AM – 01:30 PM",
    title: "PPT Presentation Round",
    points: ["Teams present proposed solutions on the given problem statement.", "Q&A session after each presentation"]
  },
  {
    time: "01:30 PM – 02:30 PM",
    title: "Lunch Break",
    points: ["Lunch provided", "Consent signing"]
  },
  {
    time: "02:30 PM – 05:00 PM",
    title: "PPT Evaluation",
    points: ["Shortlisting teams for the coding round", "Finalization of results based on PPT performance"]
  },
  {
    time: "05:00 PM – 06:00 PM",
    title: "Break & Result Declaration",
    points: ["Announcement of shortlisted teams (30 teams)", "Refreshment break"]
  },
  {
    time: "06:15 PM – 06:45 PM",
    title: "Rule Explanation",
    points: ["Coding rules explanation", "Consent signing"]
  },
  {
    time: "07:00 PM – 09:00 PM",
    title: "Coding Round",
    points: ["Coding rules explanation", "Consent signing"]
  },
  {
    time: "09:00 PM – 10:00 PM",
    title: "Dinner",
    points: ["Relaxation and energy recharge", "Dinner break"]
  },
  {
    time: "10:00 PM – 06:00 AM",
    title: "Night Coding & Mentoring Round",
    points: ["Evaluation checkpoints at 2:00 AM and 6:00 AM", "Mentor support for debugging, design, and optimization"
      ,"Continuous overnight coding session"
    ]
  },
  {
    time: "06:00 AM – 08:00 AM",
    title: "Final Evaluation",
    points: ["Final project demonstrations by teams", "Evaluation based on performance, creativity, and completeness"]
  }
];

export default function Timeline() {
  const cardsRef = useRef([]);

   useEffect(() => {
  const handleScroll = () => {
    document.documentElement.style.setProperty(
      "--scrollY",
      `${window.scrollY}px`
    );
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  /* Slide animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach(card => observer.observe(card));
  }, []);

  /* Timeline grow */
    useEffect(() => {
  const line = document.querySelector(".timeline-progress");
  const section = document.querySelector(".timeline-section");

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // How much of section is visible
    const progress = (windowHeight - rect.top) / (rect.height + windowHeight);

    const clampedProgress = Math.max(0, Math.min(progress, 1));

    line.style.height = `${clampedProgress * 100}%`;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="timeline-section">
      <div className="parallax-layer layer1"></div>
      <div className="parallax-layer layer2"></div>

      <div className="timeline-line">
        <div className="timeline-progress"></div>
      </div>

      {events.map((event, index) => (
        <div
          className="timeline-card hidden"
          key={index}
          ref={el => (cardsRef.current[index] = el)}
        >
          <p className="time">{event.time}</p>
          <h2>{event.title}</h2>
          <ul>
            {event.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
