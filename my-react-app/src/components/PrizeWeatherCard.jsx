import React from "react";
import "../styles/prizes.css";

export default function PrizeWeatherCard() {
  return (
    <div className="cardm">
      <div className="card">
        <div className="main">₹21,000</div>
        <div className="mainsub">Winner Prize</div>
      </div>

      <div className="card2">
        <div className="upper">
          <div className="humidity">
            <div className="humiditytext">
              Certificate <br /> Trophy
            </div>
          </div>

          <div className="air">
            <div className="airtext">
              Bonus <br /> Internship
            </div>
          </div>
        </div>

        <div className="lower">
          <div className="aqi">
            <div className="aqitext">
              Swags <br /> Yes
            </div>
          </div>

          <div className="realfeel">
            <div className="realfeeltext">
              Goodies <br /> Included
            </div>
          </div>

          <div className="pressure">
            <div className="pressuretext">
              Rank <br /> #1
            </div>
          </div>

          <div className="card3">Winner</div>
        </div>
      </div>
    </div>
  );
}
