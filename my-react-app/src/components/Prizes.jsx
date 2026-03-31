import React from "react";
import "../styles/prizes.css";

const defaultPrizeCards = [
  {
    title: "Winner",
    amount: "Rs. 21,000",
    emoji: "Trophy",
    tba: "Free Internship",
    border: "gold",
  },
  {
    title: "Runner Up",
    amount: "Rs. 11,000",
    emoji: "Medal",
    tba: "",
    border: "silver",
  },
];

export default function Prizes({
  title = "Prizes",
  subtitle = "Exciting rewards and swags await the most innovative minds",
  totalPrize = "Rs. 30,000+",
  prizeCards = defaultPrizeCards,
}) {
  return (
    <section className="prizes-section">
      <h1 className="prizes-title">{title}</h1>
      <p className="prizes-subtitle">{subtitle}</p>

      <h2 className="total-prize">{totalPrize}</h2>
      <p className="total-label">Total Prize Pool</p>

      <div className="prize-cards">
        {prizeCards.map((card, index) => (
          <PrizeCard
            key={`${card.title}-${index}`}
            title={card.title}
            amount={card.amount}
            emoji={card.emoji}
            tba={card.tba}
            border={card.border || "gold"}
          />
        ))}
      </div>
    </section>
  );
}

function PrizeCard({ title, amount, emoji, tba, border }) {
  return (
    <div className={`prize-card ${border}`}>
      <h3>{title}</h3>
      <div className="amount-row">
        <span className="emoji">{emoji}</span>
        <span className="amount">{amount}</span>
      </div>

      <div className="winner-placeholder">
        Winner TBA
        <br />
        <span>{tba}</span>
      </div>
    </div>
  );
}
