import React from "react";
import "../styles/prizes.css";

export default function Prizes() {
  return (
    <section className="prizes-section">
      <h1 className="prizes-title">Prizes</h1>
      <p className="prizes-subtitle">
        Exciting rewards and swags await the most innovative minds
      </p>

      <h2 className="total-prize">₹ 30,000+</h2>
      <p className="total-label">Total Prize Pool</p>

      <div className="prize-cards">

        <PrizeCard
          title="Winner"
          amount="₹21,000"
          emoji="🏆"
          tba="Free InternShip "
          border="gold"
        />

        <PrizeCard
          title="Runner Up"
          amount="₹11,000"
          emoji="🥈"
          tba =""
          border="silver"
        />

       

      </div>
    </section>
  );
}

function PrizeCard({ title, amount, emoji, tba ,border }) {
  return (
    <div className={`prize-card ${border}`}>
      <h3>{title}</h3>
      <div className="amount-row">
        <span className="emoji">{emoji}</span>
        <span className="amount">{amount}</span>
      </div>

      <div className="winner-placeholder">Winner TBA <br /><span>{tba}</span></div>
    </div>
  );
}
