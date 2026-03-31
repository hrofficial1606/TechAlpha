import "../styles/timeline.css";
import React, { useEffect, useRef, useState } from "react";

const defaultDay1Events = [
  {
    time: "7:30 AM - 8:30 AM",
    activity: "Reporting and Registration",
    points: "Participants arrive, verify registration, receive ID badges, and complete entry formalities.",
  },
  {
    time: "8:30 AM - 9:00 AM",
    activity: "Arrival of Guests",
    points: "Chief guests, judges, and mentors arrive and are welcomed by organizers.",
  },
  {
    time: "9:00 AM - 9:30 AM",
    activity: "Inauguration Ceremony",
    points: "Opening session including welcome speech, introduction of guests, and overview of the event.",
  },
  {
    time: "9:30 AM - 10:00 AM",
    activity: "Hackathon Kick-off",
    points: "Rules, evaluation criteria, and guidelines for participants are explained.",
  },
  {
    time: "10:00 AM - 1:00 PM",
    activity: "Idea Finalization and PPT Preparation",
    points: "Teams brainstorm, finalize their ideas, and prepare presentations describing their concept.",
  },
  {
    time: "1:00 PM - 1:45 PM",
    activity: "Lunch Break",
    points: "Lunch and informal networking with other participants.",
  },
  {
    time: "1:45 PM - 4:30 PM",
    activity: "Prototype Development",
    points: "Teams begin designing and building initial versions of their project or prototype.",
  },
  {
    time: "4:30 PM - 4:45 PM",
    activity: "Tea Break",
    points: "Short refreshment break to relax and recharge.",
  },
  {
    time: "4:45 PM - 6:30 PM",
    activity: "PPT and Prototype Refinement",
    points: "Teams improve their presentation and prototype based on feedback and testing.",
  },
  {
    time: "6:30 PM - 7:30 PM",
    activity: "Day 1 Wrap-up",
    points: "Summary of the day, instructions for the next day, and closing announcements.",
  },
];

const defaultDay2Events = [
  {
    time: "7:30 AM - 8:00 AM",
    activity: "Reporting of Selected Teams",
    points: "Shortlisted teams report and confirm participation for Day 2.",
  },
  {
    time: "8:00 AM - 8:30 AM",
    activity: "Problem Statement Announcement",
    points: "Official problem statements are revealed by organizers or industry partners.",
  },
  {
    time: "8:30 AM - 9:00 AM",
    activity: "Understanding and Q&A",
    points: "Teams clarify requirements, ask questions, and understand expectations.",
  },
  {
    time: "9:00 AM - 12:00 PM",
    activity: "Ideation and Planning",
    points: "Teams design the solution, define architecture, and divide tasks.",
  },
  {
    time: "12:00 PM - 12:30 PM",
    activity: "Mentor Review",
    points: "Mentors evaluate progress and provide suggestions for improvement.",
  },
  {
    time: "12:30 PM - 1:15 PM",
    activity: "Break",
    points: "Lunch or rest period before development continues.",
  },
  {
    time: "1:15 PM - 4:30 PM",
    activity: "Development and Implementation",
    points: "Teams build the solution, write code, and integrate components.",
  },
  {
    time: "4:30 PM - 4:45 PM",
    activity: "Tea Break",
    points: "Short refreshment break.",
  },
  {
    time: "4:45 PM - 6:00 PM",
    activity: "Testing and Optimization",
    points: "Teams test functionality, fix bugs, and optimize performance.",
  },
  {
    time: "6:00 PM - 6:30 PM",
    activity: "Final PPT Submission",
    points: "Teams submit final presentations and documentation.",
  },
  {
    time: "6:30 PM - 7:15 PM",
    activity: "Final Presentation",
    points: "Teams present their solutions to judges and answer questions.",
  },
  {
    time: "7:15 PM - 7:30 PM",
    activity: "Result Announcement and Prize Distribution",
    points: "Winners are announced and prizes and certificates are distributed.",
  },
];

export default function Timeline({
  day1Label = "Day 1",
  day2Label = "Day 2",
  day1Events = defaultDay1Events,
  day2Events = defaultDay2Events,
}) {
  const cardsRef = useRef([]);
  const [selectedDay, setSelectedDay] = useState("day1");

  const events = selectedDay === "day1" ? day1Events : day2Events;

  useEffect(() => {
    cardsRef.current = [];
  }, [selectedDay, day1Events, day2Events]);

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

    cardsRef.current.forEach(card => card && observer.observe(card));

    return () => observer.disconnect();
  }, [events]);

  useEffect(() => {
    const line = document.querySelector(".timeline-progress");
    const section = document.querySelector(".timeline-section");

    const handleScroll = () => {
      if (!section || !line) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
      const clamped = Math.max(0, Math.min(progress, 1));
      line.style.height = `${clamped * 100}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card");
    const listeners = [];

    cards.forEach(card => {
      const glow = card.querySelector(".card-glow");
      const handler = event => {
        if (!glow) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
      };

      card.addEventListener("mousemove", handler);
      listeners.push({ card, handler });
    });

    return () => {
      listeners.forEach(({ card, handler }) => card.removeEventListener("mousemove", handler));
    };
  }, [events]);

  return (
    <div className="timeline-section">
      <div className="particles">
        {[...Array(25)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="day-toggle">
        <div className={`toggle-slider ${selectedDay}`}></div>

        <button onClick={() => setSelectedDay("day1")}>{day1Label}</button>
        <button onClick={() => setSelectedDay("day2")}>{day2Label}</button>
      </div>

      <div className={`timeline-line ${selectedDay}`}>
        <div className="timeline-progress"></div>
      </div>

      {events.map((event, index) => (
        <div
          className="timeline-card hidden"
          key={`${event.time}-${index}`}
          ref={element => {
            cardsRef.current[index] = element;
          }}
        >
          <div className="card-glow"></div>

          <p className="time">{event.time}</p>
          <h2>{event.activity}</h2>
          <ul>{event.points}</ul>
        </div>
      ))}
    </div>
  );
}
