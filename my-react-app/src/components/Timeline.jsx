import "../styles/timeline.css";
import React, { useEffect, useRef, useState } from "react";

const day1Events = [
 {
    time: "8:00 AM to 10:00 AM",
    title: "Registration & Inauguration",
    points: ["Participant registration and ID verification Inauguration ceremony with guests and faculty Overview of HackWhack 3.0 objectives and theme"]
  },
  {
    time: "10:15 AM – 11:30 AM",
    title: "Welcome & Opening Remarks",
    points: ["Breakfast provided to all participants", "Setup time for PPT presentations"]
  },
  {
    time: "11:30 AM – 01:30 PM",
    title: "PPT Presentation Round",
    points: [ " Official welcome by organizers, introduction to the hackathon theme, rules, and expectations. Get inspired and motivated!"]
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
  }
];

const day2Events = [
 {
    time: "09:00 AM – 10:00 AM",
    title: "Rule Explanation",
    points: ["Coding rules explanation", "Consent signing"]
  },
  {
    time: "10:00 PM – 2:00 PM",
    title: "Coding Round",
    points: ["Evaluation checkpoints at 2:00 AM and 6:00 AM", "Mentor support for debugging, design, and optimization"
      ,"Continuous overnight coding session"]
  },
  {
    time: "02:00 PM",
    title: "Hack Ends | Submission Deadline",
    points: ["Submit your projects and get ready to present your innovative solutions to the judges."]
  },
  {
    time: "02:00 PM – 04:00 AM",
    title: "Judging & Conclusion",
    points: ["Judges evaluate the projects based on creativity, technicality, feasibility and impact. Get ready to showcase your hard work!"
    ]
  },
  {
    time: "04:00 AM – 05:00 AM",
    title: "Prize Distribution & Closing Ceremony",
    points: ["Celebrate your achievements, network with fellow participants, and enjoy the closing ceremony.", "Thank you for your participation, dedication, and hard work. See you at the next hackathon!"]
  }
];

export default function Timeline() {
  const cardsRef = useRef([]);
  const [selectedDay, setSelectedDay] = useState("day1");

  const events = selectedDay === "day1" ? day1Events : day2Events;

  /* Scroll animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach(card => card && observer.observe(card));
  }, [events]);

  /* Timeline progress animation */
  useEffect(() => {
    const line = document.querySelector(".timeline-progress");
    const section = document.querySelector(".timeline-section");

    const handleScroll = () => {
      if (!section || !line) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
      const clamped = Math.max(0, Math.min(progress, 1));
      line.style.height = `${clamped * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Mouse glow effect */
  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card");

    cards.forEach(card => {
      const glow = card.querySelector(".card-glow");

      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      });
    });
  }, [events]);

  return (
    <div className="timeline-section">

      {/* Particles */}
      <div className="particles">
        {[...Array(25)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Toggle */}
      <div className="day-toggle">
        <div className={`toggle-slider ${selectedDay}`}></div>

        <button onClick={() => setSelectedDay("day1")}>Day 1</button>
        <button onClick={() => setSelectedDay("day2")}>Day 2</button>
      </div>

      {/* Timeline Line */}
      <div className={`timeline-line ${selectedDay}`}>
        <div className="timeline-progress"></div>
      </div>

      {/* Cards */}
      {events.map((event, index) => (
        <div
          className="timeline-card hidden"
          key={index}
          ref={el => (cardsRef.current[index] = el)}
        >
          <div className="card-glow"></div>

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
