import React, { useEffect, useState } from "react";
import "../styles/Countdown.css";

export default function Countdown() {
  // Set your event date here
  const targetDate = new Date("2026-02-21T10:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">Time Left</h2>

      <div className="time-boxes">
        <TimeBox value={timeLeft.days} label="DAYS" />
        <TimeBox value={timeLeft.hours} label="HOURS" />
        <TimeBox value={timeLeft.minutes} label="MINUTES" />
        <TimeBox value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="time-box">
      <h1>{value}</h1>
      <p>{label}</p>
    </div>
  );
}
